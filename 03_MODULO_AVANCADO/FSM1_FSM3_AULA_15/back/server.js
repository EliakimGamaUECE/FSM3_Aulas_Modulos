// src/index.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

function parseId(x) {
  const id = Number(x);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("ID inválido");
    err.status = 400;
    throw err;
  }
  return id;
}

app.get("/health", async (_req, res) => {
  try { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true }); }
  catch { res.status(500).json({ ok: false }); }
});

// ---------------- Users ----------------
app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name é obrigatório" });
  const user = await prisma.user.create({ data: { name } });
  res.status(201).json(user);
});

// ---------------- Challenges ----------------
app.post("/challenges", async (req, res) => {
  const { title, description, deadline, points, maxSubmissionsPerUser } = req.body;
  if (!title || !description || !deadline) {
    return res.status(400).json({ error: "title, description, deadline" });
  }
  const ch = await prisma.challenge.create({
    data: {
      title,
      description,
      deadline: new Date(deadline),
      points: Number(points ?? 10),
      maxSubmissionsPerUser: Number(maxSubmissionsPerUser ?? 1),
    },
  });
  res.status(201).json(ch);
});

app.get("/challenges", async (req, res) => {
  const onlyActive = req.query.active === "true";
  const now = new Date();
  const list = await prisma.challenge.findMany({
    where: onlyActive ? { deadline: { gte: now } } : undefined,
    orderBy: { createdAt: "desc" },
  });
  res.json(list);
});

// ---------------- Submissions ----------------
app.post("/challenges/:id/submit", async (req, res) => {
  try {
    const challengeId = parseId(req.params.id);
    const { userId, url, note } = req.body;
    if (!userId || !url) return res.status(400).json({ error: "userId e url são obrigatórios" });

    const [user, challenge] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.challenge.findUnique({ where: { id: challengeId } }),
    ]);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    if (!challenge) return res.status(404).json({ error: "Desafio não encontrado" });
    if (new Date() > challenge.deadline) return res.status(400).json({ error: "Prazo encerrado" });

    const count = await prisma.submission.count({ where: { userId, challengeId } });
    if (count >= challenge.maxSubmissionsPerUser)
      return res.status(400).json({ error: "Limite de envios atingido" });

    const dup = await prisma.submission.findFirst({ where: { userId, challengeId, url } });
    if (dup) return res.status(409).json({ error: "URL já enviada para este desafio" });

    const sub = await prisma.submission.create({ data: { userId, challengeId, url, note } });
    res.status(201).json(sub);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message || "Erro ao enviar submissão" });
  }
});

app.patch("/submissions/:id/status", async (req, res) => {
  const id = parseId(req.params.id);
  const { status } = req.body;
  if (!status || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }
  const updated = await prisma.submission.update({ where: { id }, data: { status } });
  res.json(updated);
});

app.post("/submissions/:id/vote", async (req, res) => {
  const submissionId = parseId(req.params.id);
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  const [voter, sub] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.submission.findUnique({ where: { id: submissionId } }),
  ]);
  if (!voter) return res.status(404).json({ error: "Usuário não encontrado" });
  if (!sub) return res.status(404).json({ error: "Submissão não encontrada" });
  if (sub.userId === userId) return res.status(400).json({ error: "Não pode votar na própria submissão" });

  try {
    await prisma.vote.create({ data: { submissionId, userId, value: 1 } });
  } catch (e) {
    if (e.code === "P2002") return res.status(409).json({ error: "Já votou nesta submissão" });
    throw e;
  }
  const total = await prisma.vote.count({ where: { submissionId } });
  res.json({ ok: true, votes: total });
});

app.get("/challenges/:id/submissions", async (req, res) => {
  const challengeId = parseId(req.params.id);
  const list = await prisma.submission.findMany({
    where: { challengeId },
    include: {
      user: { select: { id: true, name: true } },
      _count: { select: { votes: true } },
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });
  res.json(list.map((s) => ({
    id: s.id,
    url: s.url,
    note: s.note,
    status: s.status,
    createdAt: s.createdAt,
    author: s.user,
    votes: s._count.votes,
  })));
});

app.get("/leaderboard", async (_req, res) => {
  const approved = await prisma.submission.findMany({
    where: { status: "APPROVED" },
    select: {
      userId: true,
      challenge: { select: { points: true } },
      _count: { select: { votes: true } },
    },
  });
  const scores = new Map();
  for (const s of approved) {
    const base = s.challenge.points;
    const bonus = Math.min(s._count.votes, 5);
    scores.set(s.userId, (scores.get(s.userId) ?? 0) + base + bonus);
  }
  const users = await prisma.user.findMany({ select: { id: true, name: true } });
  const result = users.map((u) => ({ user: u, score: scores.get(u.id) ?? 0 }))
    .sort((a, b) => b.score - a.score).slice(0, 50);
  res.json(result);
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => console.log(`API em http://localhost:${PORT}`));