import Home from './pages/Home.jsx'
import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Admin from './pages/Admin.jsx'
const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/admin" element={<Admin />} />
       </Routes>
     </BrowserRouter>
  )
}

export default App