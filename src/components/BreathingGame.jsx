import React, { useState, useEffect } from 'react'

export default function BreathingGame({ onClose }){
  const [phase, setPhase] = useState('breathe-in') // breathe-in, hold, breathe-out
  const [scale, setScale] = useState(1)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    let timer
    if (phase === 'breathe-in') {
      let s = 1
      timer = setInterval(() => {
        s += 0.05
        if (s >= 1.4) {
          setPhase('hold')
          setScale(1.4)
        } else {
          setScale(s)
        }
      }, 30)
    } else if (phase === 'hold') {
      timer = setTimeout(() => setPhase('breathe-out'), 4000)
    } else if (phase === 'breathe-out') {
      let s = 1.4
      timer = setInterval(() => {
        s -= 0.05
        if (s <= 1) {
          setPhase('breathe-in')
          setScale(1)
          setCompleted(c => c + 1)
        } else {
          setScale(s)
        }
      }, 30)
    }
    return () => clearInterval(timer) || clearTimeout(timer)
  }, [phase])

  const messages = {
    'breathe-in': 'Breathe in slowly...',
    'hold': 'Hold...',
    'breathe-out': 'Breathe out...'
  }

  return (
    <div style={{
      padding: '32px 24px',
      textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: '8px' }}>Guided Breathing</h3>
      <p className="muted" style={{ marginBottom: '32px' }}>A 3-minute calming exercise</p>

      <div style={{
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          transform: `scale(${scale})`,
          transition: 'transform 50ms ease-out',
          opacity: 0.7
        }}></div>
      </div>

      <p style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--primary)' }}>
        {messages[phase]}
      </p>

      <p className="muted">Cycles completed: {completed}</p>

      <div className="actions" style={{ marginTop: '24px' }}>
        <button className="btn ghost" onClick={onClose} style={{ flex: 1 }}>
          Done ({completed > 0 ? 'Great job!' : 'Exit'})
        </button>
      </div>
    </div>
  )
}
