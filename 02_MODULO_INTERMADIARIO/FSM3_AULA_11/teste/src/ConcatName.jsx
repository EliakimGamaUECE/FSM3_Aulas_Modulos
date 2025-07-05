import { useState } from "react";


function ConcatName() {

    const [nome, setNome] = useState("Eliakim")


    return (
        <>
            <h1>{nome}</h1>
            <button onClick={() => setNome(nome + " Gama")} >Muda nome</button>
        </>

    )
}

export default ConcatName