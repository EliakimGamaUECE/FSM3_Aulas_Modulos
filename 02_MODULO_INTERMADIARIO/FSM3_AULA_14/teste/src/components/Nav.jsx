import { Link } from 'react-router-dom'
import '../styles/Nav.css'

export default function Nav() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">MinhaLogo</div>
            <ul className="navbar-links">
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/semaforo' >Semaforo</Link></li>
                <li><Link to='/qualquernome' >Concatenar Nomes</Link></li>
            </ul>
        </nav>
    )
}
