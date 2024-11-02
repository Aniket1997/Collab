import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
