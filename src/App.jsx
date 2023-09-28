import Dashboard from './pages/Dashboard/Dashboard'
import './scss/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Animator from './pages/Animator/Animator'
import Procuders from './pages/Procuders/Procuders'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="animator" element={<Animator />}></Route>
        <Route path="procuders" element={<Procuders />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
