import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'


//Pages
import Home from './pages/home'
import RemoveBorrowerPage from './pages/RemoveBorrower'


//Components
import NavBar from './components/NavBar'

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="pages">
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/loans/:loan_id/:borrower_id" element={<RemoveBorrowerPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
