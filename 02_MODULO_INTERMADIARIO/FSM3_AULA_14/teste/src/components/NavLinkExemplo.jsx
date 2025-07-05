import { NavLink } from 'react-router-dom'
import '../styles/NavLink.css'

function NavLinkExemplo() {
    return (
        <nav>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
            </NavLink>
            <NavLink to='/semaforo' className={({ isActive }) => (isActive ? 'active' : '')}>
                Semáforo
            </NavLink>
            <NavLink to='/qualquernome' className={({ isActive }) => (isActive ? 'active' : '')}>
                Concatenar Nomes
            </NavLink>
        </nav>

    )
}

export default NavLinkExemplo