import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import EntryLog from './pages/EntryLog'
import Games from './pages/Games'
import Community from './pages/Community'
import Profile from './pages/Profile'

function ProtectedRoute({ children, user }){
  return user ? children : <Navigate to="/" />
}

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const stored = localStorage.getItem('mm-user')
    if(stored){
      const userData = JSON.parse(stored)
      setUser(userData)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('mm-user')
    setUser(null)
  }

  const handleSignUp = (username) => {
    const userData = { id: Date.now(), username, createdAt: new Date().toISOString() }
    localStorage.setItem('mm-user', JSON.stringify(userData))
    setUser(userData)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp onSignUp={handleSignUp} />} />
        <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn onSignIn={handleSignUp} />} />

        <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute user={user}><Journal user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/entries" element={<ProtectedRoute user={user}><EntryLog user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute user={user}><Games user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute user={user}><Community user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user} onLogout={handleLogout} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
