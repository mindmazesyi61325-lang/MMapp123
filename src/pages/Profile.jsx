import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

export default function Profile({ user, onLogout }){
  const [stats, setStats] = useState({ entries: 0, moods: 0, games: 0, days: 0 })

  useEffect(() => {
    const rawEntries = localStorage.getItem('mm-journal')
    const rawMoods = localStorage.getItem('mm-moods')
    const entries = rawEntries ? JSON.parse(rawEntries).length : 0
    const moods = rawMoods ? JSON.parse(rawMoods).length : 0
    const createdAt = new Date(user.createdAt)
    const now = new Date()
    const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24)) + 1

    setStats({ entries, moods, games: 0, days })
  }, [user])

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ marginBottom: '24px' }}>👤 Profile</h1>

        <div className="grid">
          {/* Profile Card */}
          <section className="card elevated" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem'
              }}>
                💜
              </div>
              <div>
                <h2 style={{ margin: '0 0 8px 0' }}>{user.username}</h2>
                <p className="muted" style={{ margin: '0 0 8px 0' }}>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="muted small" style={{ margin: 0 }}>ID: {user.id}</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="card elevated">
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.days}</div>
            <div className="muted small">Days Active</div>
          </div>
          <div className="card elevated">
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>{stats.entries}</div>
            <div className="muted small">Journal Entries</div>
          </div>
          <div className="card elevated">
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.moods}</div>
            <div className="muted small">Mood Checks</div>
          </div>
          <div className="card elevated">
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>🔥</div>
            <div className="muted small">Current Streak</div>
          </div>
        </div>

        {/* Achievements */}
        <section className="card elevated" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>🏆 Achievements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid var(--success)',
              borderRadius: '10px'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌟</div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>First Step</p>
            </div>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              background: 'rgba(167, 139, 250, 0.1)',
              border: '1px solid var(--primary)',
              borderRadius: '10px',
              opacity: 0.5
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📝</div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Writer (5 entries)</p>
            </div>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              background: 'rgba(236, 72, 153, 0.1)',
              border: '1px solid var(--accent)',
              borderRadius: '10px',
              opacity: 0.5
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎮</div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Game Master (3 plays)</p>
            </div>
            <div style={{
              padding: '16px',
              textAlign: 'center',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid #fbbf24',
              borderRadius: '10px',
              opacity: 0.5
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💎</div>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Consistent (7-day streak)</p>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="card elevated" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>⚙️ Settings</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <label className="checkbox">
              <input type="checkbox" defaultChecked={true} />
              <span>Daily reminders</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" defaultChecked={true} />
              <span>Mood notifications</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" defaultChecked={false} />
              <span>Community updates</span>
            </label>
          </div>
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid #ff6b6b', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#ff6b6b' }}>🛑 Danger Zone</p>
            <p className="muted small" style={{ margin: '0 0 12px 0' }}>
              Reset all data or delete your account
            </p>
            <button className="btn ghost" style={{ borderColor: '#ff6b6b', color: '#ff6b6b' }}>
              Reset All Data
            </button>
          </div>
        </section>

        {/* Info */}
        <section className="card elevated" style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>ℹ️ About MindMaze</h3>
          <p className="muted" style={{ marginBottom: '12px' }}>
            Version 1.0.0 • Beta Release
          </p>
          <p style={{ marginBottom: '12px' }}>
            MindMaze is a safe space for emotional wellness. We're not a therapy platform—we're here to help you understand and support yourself.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>In Crisis?</strong> Call 988 (Suicide & Crisis Lifeline) anytime, 24/7.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn ghost">Privacy Policy</button>
            <button className="btn ghost">Community Guidelines</button>
            <button className="btn ghost">Contact Support</button>
          </div>
        </section>
      </main>
    </div>
  )
}
