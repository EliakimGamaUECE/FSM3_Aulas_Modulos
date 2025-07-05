import { useState } from "react";
import './Semaforo.css'

function ConcateName() {

    const [nome, setNome] = useState('Eliakim')


    return (

        <>
            <div className="semaforo" >
                <div className="luz" ></div>
                <div className="luz" ></div>
                <div className="luz" ></div>
            </div>
        </>
    )
}

export default ConcateName