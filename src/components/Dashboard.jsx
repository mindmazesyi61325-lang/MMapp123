import React, { useState, useEffect } from 'react'
import BreathingGame from './BreathingGame'
import FocusGame from './FocusGame'
import CalmingGame from './CalmingGame'

function EmotionalJourney(){
  const [moods, setMoods] = useState([])
  const [todayMood, setTodayMood] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('mm-moods')
    if (raw) setMoods(JSON.parse(raw))
  }, [])

  function recordMood(mood){
    const moodEntry = { mood, ts: Date.now() }
    const updated = [moodEntry, ...moods]
    setMoods(updated)
    localStorage.setItem('mm-moods', JSON.stringify(updated))
    setTodayMood(mood)
  }

  const moodEmojis = { happy: '😊', sad: '😢', anxious: '😰', calm: '😌', energetic: '🤩' }
  const progress = moods.length || 0

  return (
    <section className="card elevated">
      <div className="section-title">
        <h3>Emotional Journey</h3>
      </div>
      <p className="muted" style={{ marginBottom: '16px' }}>
        Track your mood patterns over time
      </p>

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(moodEmojis).map(([mood, emoji]) => (
          <button
            key={mood}
            className={`btn sm ${todayMood === mood ? 'secondary' : 'ghost'}`}
            onClick={() => recordMood(mood)}
            style={{
              padding: '10px 16px',
              fontSize: '1.2rem'
            }}
            title={mood}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div style={{
        height: '120px',
        background: 'rgba(167, 139, 250, 0.05)',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        justifyContent: 'space-around',
        marginBottom: '16px'
      }}>
        {Array(7).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${Math.random() * 80 + 20}px`,
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              borderRadius: '6px',
              opacity: 0.7
            }}
          ></div>
        ))}
      </div>

      <p className="muted small">
        📊 {progress} moods tracked · Last 7 days shown
      </p>
    </section>
  )
}

function StressBusters({ onPlayGame }){
  const games = [
    { id: 'breathing', icon: '🫁', label: 'Breathing', desc: 'Calm your mind' },
    { id: 'focus', icon: '🎮', label: 'Focus Game', desc: 'Sharpen focus' },
    { id: 'release', icon: '💭', label: 'Release', desc: 'Let go of worries' }
  ]

  return (
    <section className="card elevated">
      <div className="section-title">
        <h3>Stress-Buster Activities</h3>
      </div>
      <p className="muted" style={{ marginBottom: '16px' }}>
        Quick games to calm and center yourself
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px'
      }}>
        {games.map(game => (
          <button
            key={game.id}
            className="btn ghost"
            onClick={() => onPlayGame(game.id)}
            style={{
              padding: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ fontSize: '2rem' }}>{game.icon}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{game.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{game.desc}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default function Dashboard({ user, onLogout }){
  const [journal, setJournal] = useState('')
  const [entries, setEntries] = useState([])
  const [activeGame, setActiveGame] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('mm-journal')
    if (raw) setEntries(JSON.parse(raw))
  }, [])

  function saveEntry(){
    if (!journal.trim()) return
    const item = { text: journal.trim(), ts: Date.now() }
    const next = [item, ...entries]
    setEntries(next)
    localStorage.setItem('mm-journal', JSON.stringify(next))
    setJournal('')
  }

  if (activeGame) {
    return (
      <div className="page padded">
        <div className="card" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Activity</h3>
          <button className="btn ghost sm" onClick={() => setActiveGame(null)}>Close</button>
        </div>
        <div className="card">
          {activeGame === 'breathing' && <BreathingGame onClose={() => setActiveGame(null)} />}
          {activeGame === 'focus' && <FocusGame onClose={() => setActiveGame(null)} />}
          {activeGame === 'release' && <CalmingGame onClose={() => setActiveGame(null)} />}
        </div>
      </div>
    )
  }

  return (
    <div className="page padded">
      <header className="topbar">
        <div>
          <h2 style={{ margin: '0 0 4px 0' }}>Welcome, {user.username}! 💜</h2>
          <p className="muted small" style={{ margin: 0 }}>Your safe space awaits</p>
        </div>
        <button className="btn ghost sm" onClick={onLogout}>Sign Out</button>
      </header>

      <main className="grid">
        <EmotionalJourney />

        <section className="card elevated">
          <div className="section-title">
            <h3>Daily Journal</h3>
          </div>
          <p className="muted" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
            Your thoughts stay private & safe
          </p>
          <textarea 
            value={journal} 
            onChange={e => setJournal(e.target.value)} 
            placeholder="How did today feel? What's on your mind?"
          ></textarea>
          <div className="actions">
            <button className="btn secondary" onClick={saveEntry} disabled={!journal.trim()}>
              Save Entry
            </button>
          </div>

          {entries.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <p className="muted small" style={{ marginBottom: '12px' }}>
                Recent entries ({entries.length})
              </p>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {entries.slice(0, 5).map((e, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-text">{e.text}</div>
                    <div className="entry-meta muted small">
                      {new Date(e.ts).toLocaleDateString()} {new Date(e.ts).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <StressBusters onPlayGame={setActiveGame} />

        <section className="card elevated">
          <div className="section-title">
            <h3>Community Chats</h3>
          </div>
          <p className="muted" style={{ marginBottom: '16px' }}>
            Connect with peers in topic-based rooms
          </p>

          <div style={{
            display: 'grid',
            gap: '12px'
          }}>
            {['Stress & School', 'Motivation', 'Sleep & Rest'].map((topic) => (
              <div
                key={topic}
                style={{
                  padding: '12px',
                  background: 'rgba(167, 139, 250, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{topic}</p>
                <p className="muted small" style={{ margin: 0 }}>Coming soon · Chat with peers</p>
              </div>
            ))}
          </div>

          <p className="muted small" style={{ marginTop: '16px' }}>
            💬 Message moderation keeps everyone safe
          </p>
        </section>

        <section className="card elevated">
          <div className="section-title">
            <h3>Emergency Support</h3>
          </div>
          <p className="muted" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
            If you're in crisis, please reach out to trained professionals
          </p>
          <div style={{
            padding: '16px',
            background: 'rgba(236, 72, 153, 0.1)',
            border: '1px solid var(--accent)',
            borderRadius: '10px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>🆘 Crisis Helpline (US)</p>
            <p style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              <strong>988</strong> (Suicide & Crisis Lifeline)
            </p>
            <p className="muted small" style={{ margin: 0 }}>Available 24/7 · Free · Confidential</p>
          </div>
          <p className="muted small">
            MindMaze is not a therapy platform. For urgent help, always call emergency services or a crisis helpline.
          </p>
        </section>
      </main>
    </div>
  )
}

