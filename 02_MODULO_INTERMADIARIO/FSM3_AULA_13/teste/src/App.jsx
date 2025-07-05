
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import MudaNomeInput from './MudaNomeInput.jsx'
import ConcatNome from './ConcatNome.jsx'
import Semaforo from './Semaforo.jsx'

function App() {
  

  return (
    <BrowserRouter>
      <Nav/> 
      <Routes>
        <Route path='/' element={<MudaNomeInput/>} ></Route>
        <Route path='/qualquernome' element={<ConcatNome/>} ></Route>
        <Route path='/semaforo' element={<Semaforo/>} ></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
