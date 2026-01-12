import React, { useState, useEffect } from 'react'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'

export default function App(){
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState('landing') // landing, signup, signin, dashboard

  useEffect(()=>{
    const stored = localStorage.getItem('mm-user')
    if(stored){
      const userData = JSON.parse(stored)
      setUser(userData)
      setScreen('dashboard')
    }
  }, [])

  const handleSignUp = (username) => {
    const userData = { id: Date.now(), username, createdAt: new Date().toISOString() }
    localStorage.setItem('mm-user', JSON.stringify(userData))
    setUser(userData)
    setScreen('dashboard')
  }

  const handleSignIn = (username) => {
    const userData = { id: Date.now(), username, createdAt: new Date().toISOString() }
    localStorage.setItem('mm-user', JSON.stringify(userData))
    setUser(userData)
    setScreen('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('mm-user')
    setUser(null)
    setScreen('landing')
  }

  return (
    <>
      {screen === 'landing' && <Landing onGetStarted={() => setScreen('signup')} />}
      {screen === 'signup' && <SignUp onSignUp={handleSignUp} onHaveAccount={() => setScreen('signin')} />}
      {screen === 'signin' && <SignIn onSignIn={handleSignIn} onCreateAccount={() => setScreen('signup')} />}
      {screen === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} />}
    </>
  )
}
