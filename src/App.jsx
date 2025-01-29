import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./home"
import Ticket from "./ticket"
import Form from "./form"
import Dashboard from "./dashboard"
import Navbar from "./NavBar"

import Landingpage from "./LandingPage"

const App = () => {
  return (

    <Router>
       {/* bg-gradient-to-br from-[#1B0E33] to-[#2B0442] */}
      <div className="app h-screen w-full ">
     
       
        <Routes >
          <Route path="/" exact Component={Home} />
          <Route path="/register"  element={<Form />} />
          <Route path="/ticket"  Component={Ticket} />
          <Route path="/dashboard"  Component={Dashboard} />
          <Route path="/la"  Component={Landingpage} />
        </Routes>

      </div>
    </Router>

  )
}

export default App
