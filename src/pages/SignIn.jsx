import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn({ onSignIn }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function submit(){
    setError('')
    
    if(!username.trim()){
      setError('Please enter your username')
      return
    }

    onSignIn(username)
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
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Enter your username to continue
        </p>

        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Your username" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions" style={{ marginTop: '24px' }}>
          <button className="btn secondary" style={{ flex: 1 }} onClick={submit}>
            Sign In
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem' }}>
          New to MindMaze?{' '}
          <a href="#" onClick={e => { e.preventDefault(); navigate('/signup') }} style={{ 
            color: 'var(--primary)', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Create Account
          </a>
        </p>
      </div>
    </div>
  )
}
