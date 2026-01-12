import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp({ onSignUp }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  function submit(){
    setError('')
    
    if(!username.trim()){
      setError('Please choose a username')
      return
    }
    if(username.length < 3){
      setError('Username must be at least 3 characters')
      return
    }
    if(username.length > 20){
      setError('Username must be 20 characters or less')
      return
    }

    const n = parseInt(age, 10)
    if(Number.isNaN(n) || n < 13){
      setError('You must be 13 or older to use MindMaze')
      return
    }

    if(!agreed){
      setError('Please agree to our guidelines')
      return
    }

    onSignUp(username)
    navigate('/dashboard')
  }

  return (
    <div className="page full center">
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(167, 139, 250, 0.1), transparent 50%)',
        pointerEvents: 'none'
      }}></div>

      <div className="modal-card" style={{ maxWidth: '420px', zIndex: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Join MindMaze in seconds
        </p>

        <div className="form-group">
          <label>Choose a username</label>
          <input 
            type="text" 
            placeholder="e.g., MindfulTiger" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
          />
          <small style={{ color: 'var(--text-muted)' }}>3-20 characters, no spaces</small>
        </div>

        <div className="form-group">
          <label>Your age</label>
          <input 
            type="number" 
            placeholder="13" 
            value={age} 
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="checkbox">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={e => setAgreed(e.target.checked)} 
            />
            <span>I'm 13+ and agree to our community guidelines</span>
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions" style={{ marginTop: '24px' }}>
          <button className="btn secondary" style={{ flex: 1 }} onClick={submit}>
            Create Account
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <a href="#" onClick={e => { e.preventDefault(); navigate('/signin') }} style={{ 
            color: 'var(--primary)', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
