import { useState } from "react";

function ConcateName() {

    const [nome, setNome] = useState('Eliakim')


    return (

        <>
            <h1>{nome}</h1>
            <button onClick={() => setNome(nome + ' Gama')} >Muda Nome</button>
            <button onClick={() => setNome('')} >Limpa Nome</button>
        </>
    )
}

export default ConcateName