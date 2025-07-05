import { useState } from "react";
import './Semaforo.css'

function Semaforo() {

    const [nome, setNome] = useState("Eliakim")


    return (
        <>
            <h1>Semaforo</h1>
            <div className="semaforo" >
                <div className="luz" ></div>
                <div className="luz" ></div>
                <div className="luz" ></div>
            </div>
        </>

    )
}

export default Semaforo