import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import BreathingGame from '../components/BreathingGame'
import FocusGame from '../components/FocusGame'
import CalmingGame from '../components/CalmingGame'

export default function Games({ user, onLogout }){
  const [activeGame, setActiveGame] = useState(null)

  if (activeGame) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar user={user} onLogout={onLogout} />
        <main style={{ flex: 1, padding: '24px' }}>
          <button className="btn ghost" onClick={() => setActiveGame(null)} style={{ marginBottom: '24px' }}>
            ← Back to Games
          </button>
          <div className="card">
            {activeGame === 'breathing' && <BreathingGame onClose={() => setActiveGame(null)} />}
            {activeGame === 'focus' && <FocusGame onClose={() => setActiveGame(null)} />}
            {activeGame === 'release' && <CalmingGame onClose={() => setActiveGame(null)} />}
          </div>
        </main>
      </div>
    )
  }

  const games = [
    {
      id: 'breathing',
      icon: '🫁',
      title: 'Guided Breathing',
      desc: 'A 3-minute calming exercise with animated breathing guidance.',
      benefits: ['Calm anxiety', 'Reduce stress', 'Clear mind']
    },
    {
      id: 'focus',
      icon: '🎮',
      title: 'Focus Game',
      desc: '30-second color-matching challenge to sharpen your focus.',
      benefits: ['Improve focus', 'Mental exercise', 'Quick break']
    },
    {
      id: 'release',
      icon: '💭',
      title: 'Release & Reflect',
      desc: 'Write down worries and watch them disappear.',
      benefits: ['Let go of stress', 'Mindfulness', 'Emotional relief']
    }
  ]

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ marginBottom: '24px' }}>🎮 Stress-Buster Games</h1>
        <p className="muted" style={{ marginBottom: '24px', maxWidth: '600px' }}>
          Quick activities to calm your mind and ground yourself. No timers that create pressure—just you and the moment.
        </p>

        <div className="grid">
          {games.map(game => (
            <div key={game.id} className="card elevated" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{game.icon}</div>
              <h3 style={{ marginBottom: '8px' }}>{game.title}</h3>
              <p className="muted" style={{ marginBottom: '16px', flex: 1 }}>{game.desc}</p>

              <div style={{ marginBottom: '16px' }}>
                <p className="muted small" style={{ marginBottom: '8px' }}>Benefits:</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {game.benefits.map((b, i) => (
                    <span key={i} className="badge">{b}</span>
                  ))}
                </div>
              </div>

              <button className="btn secondary" onClick={() => setActiveGame(game.id)} style={{ width: '100%' }}>
                Play Now
              </button>
            </div>
          ))}
        </div>

        <section className="card elevated" style={{ marginTop: '24px' }}>
          <h3>🎯 Pro Tips</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Play whenever you feel overwhelmed</li>
            <li style={{ marginBottom: '8px' }}>No scores or competition—just for you</li>
            <li style={{ marginBottom: '8px' }}>Combine with journaling for deeper reflection</li>
            <li>Regular practice builds emotional resilience</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
