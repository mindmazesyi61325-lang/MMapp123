import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

function MoodTracker(){
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
        📊 {moods.length} moods tracked · Last 7 days shown
      </p>
    </section>
  )
}

function Stats(){
  const [moods, setMoods] = useState([])
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const rawMoods = localStorage.getItem('mm-moods')
    if (rawMoods) setMoods(JSON.parse(rawMoods))
    const rawEntries = localStorage.getItem('mm-journal')
    if (rawEntries) setEntries(JSON.parse(rawEntries))
  }, [])

  return (
    <section className="card elevated">
      <div className="section-title">
        <h3>Your Stats</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ padding: '16px', background: 'rgba(167, 139, 250, 0.1)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>{moods.length}</div>
          <div className="muted small">Mood Tracks</div>
        </div>
        <div style={{ padding: '16px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>{entries.length}</div>
          <div className="muted small">Entries</div>
        </div>
        <div style={{ padding: '16px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--success)' }}>🔥</div>
          <div className="muted small">Streak</div>
        </div>
      </div>
    </section>
  )
}

export default function Dashboard({ user, onLogout }){
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <div className="grid">
          <MoodTracker />
          <Stats />

          <section className="card elevated">
            <div className="section-title">
              <h3>Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              <a href="/journal" style={{ padding: '16px', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid var(--border)', borderRadius: '10px', textDecoration: 'none', color: 'var(--text)', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(167, 139, 250, 0.15)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>📝 Write in Journal</p>
                <p className="muted small" style={{ margin: 0 }}>Express yourself today</p>
              </a>
              <a href="/games" style={{ padding: '16px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid var(--border)', borderRadius: '10px', textDecoration: 'none', color: 'var(--text)', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>🎮 Play Games</p>
                <p className="muted small" style={{ margin: 0 }}>Calm your mind</p>
              </a>
            </div>
          </section>

          <section className="card elevated">
            <div className="section-title">
              <h3>Achievements</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🌟</div>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'rgba(167, 139, 250, 0.2)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', opacity: 0.5 }}>🎯</div>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.2)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', opacity: 0.5 }}>💎</div>
            </div>
            <p className="muted small" style={{ marginTop: '12px' }}>Unlock more by staying consistent!</p>
          </section>
        </div>
      </main>
    </div>
  )
}
