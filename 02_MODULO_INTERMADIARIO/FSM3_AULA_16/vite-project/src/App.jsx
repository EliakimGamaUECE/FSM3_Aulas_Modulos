import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [nome, setNome] = useState("Eliakim")


  const mudaNome = () =>{
    setNome(nome + ' Gama')
  }

  useEffect(()=>{
      alert("Opaaa!!! Alguma coisa mudou!!!!")
  },[nome])

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={mudaNome}>
         {nome}
        </button>

      </div>

    </>
  )
}

export default App
