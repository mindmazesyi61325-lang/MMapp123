import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ user, onLogout }){
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/journal', icon: '📝', label: 'Journal' },
    { path: '/entries', icon: '📚', label: 'All Entries' },
    { path: '/games', icon: '🎮', label: 'Games' },
    { path: '/community', icon: '💬', label: 'Community' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ]

  return (
    <aside style={{
      width: '240px',
      background: 'linear-gradient(180deg, var(--card-light), var(--card))',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ padding: '24px 16px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', background: 'linear-gradient(135deg, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          💜 MindMaze
        </h2>
        <p className="muted small" style={{ margin: 0 }}>Welcome, {user.username}!</p>
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              margin: '4px 0',
              borderRadius: '10px',
              textDecoration: 'none',
              color: 'var(--text-muted)',
              transition: 'all 0.3s',
              background: location.pathname === item.path ? 'rgba(167, 139, 250, 0.15)' : 'transparent',
              borderLeft: location.pathname === item.path ? '3px solid var(--primary)' : '3px solid transparent',
              paddingLeft: location.pathname === item.path ? '13px' : '16px',
              color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)'
            }}
            onMouseEnter={e => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.08)'
              }
            }}
            onMouseLeave={e => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{ fontWeight: location.pathname === item.path ? '600' : '500' }}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
        <button
          className="btn ghost"
          onClick={onLogout}
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            padding: '12px 16px',
            marginBottom: '8px'
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}
