import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

export default function Community({ user, onLogout }){
  const [activeRoom, setActiveRoom] = useState(null)
  const [messages, setMessages] = useState({})
  const [newMessage, setNewMessage] = useState('')

  const rooms = [
    { id: 'stress', name: 'Stress & School', emoji: '📚', desc: 'Talk about exams, deadlines, and pressure' },
    { id: 'motivation', name: 'Motivation', emoji: '💪', desc: 'Share goals and celebrate wins' },
    { id: 'sleep', name: 'Sleep & Rest', emoji: '😴', desc: 'Tips for better sleep and relaxation' },
    { id: 'social', name: 'Social & Friends', emoji: '👥', desc: 'Friendships, crushes, and connections' },
    { id: 'creative', name: 'Creative Corner', emoji: '🎨', desc: 'Art, music, writing, and self-expression' },
    { id: 'win', name: 'Wins & Gratitude', emoji: '✨', desc: 'Celebrate your victories, big and small' }
  ]

  useEffect(() => {
    const stored = localStorage.getItem('mm-chat-messages')
    if (stored) setMessages(JSON.parse(stored))
  }, [])

  function sendMessage(){
    if (!newMessage.trim() || !activeRoom) return

    const msg = {
      id: Date.now(),
      user: user.username,
      text: newMessage,
      ts: new Date().toISOString()
    }

    const updated = {
      ...messages,
      [activeRoom]: [...(messages[activeRoom] || []), msg]
    }
    setMessages(updated)
    localStorage.setItem('mm-chat-messages', JSON.stringify(updated))
    setNewMessage('')
  }

  if (activeRoom) {
    const room = rooms.find(r => r.id === activeRoom)
    const roomMessages = messages[activeRoom] || []

    return (
      <div style={{ display: 'flex' }}>
        <Sidebar user={user} onLogout={onLogout} />
        <main style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <button className="btn ghost" onClick={() => setActiveRoom(null)} style={{ marginBottom: '16px', alignSelf: 'flex-start' }}>
            ← Back to Rooms
          </button>

          <div className="card elevated" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <h2 style={{ marginBottom: '8px' }}>{room.emoji} {room.name}</h2>
            <p className="muted" style={{ marginBottom: '16px' }}>{room.desc}</p>

            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '16px', minHeight: '300px' }}>
              {roomMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <p>No messages yet. Be the first to say hello! 👋</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {roomMessages.map(msg => (
                    <div key={msg.id} style={{
                      padding: '12px',
                      background: msg.user === user.username ? 'rgba(167, 139, 250, 0.15)' : 'rgba(167, 139, 250, 0.05)',
                      borderLeft: `3px solid ${msg.user === user.username ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px', color: msg.user === user.username ? 'var(--primary)' : 'var(--text)' }}>
                        {msg.user} {msg.user === user.username && '(you)'}
                      </div>
                      <div style={{ marginBottom: '4px' }}>{msg.text}</div>
                      <div className="muted small">{new Date(msg.ts).toLocaleTimeString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Share something kind..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                style={{ flex: 1 }}
              />
              <button className="btn secondary" onClick={sendMessage} disabled={!newMessage.trim()}>
                Send
              </button>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid var(--accent)', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              <strong>💜 Community Guidelines:</strong> Be kind, respectful, and supportive. No judgment, no advice—just listening.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ marginBottom: '24px' }}>💬 Community Rooms</h1>
        <p className="muted" style={{ marginBottom: '24px', maxWidth: '600px' }}>
          Connect with peers in topic-based rooms. Share experiences, listen, and support each other without judgment.
        </p>

        <div className="grid">
          {rooms.map(room => (
            <div key={room.id} className="card elevated" style={{ cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => setActiveRoom(room.id)} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(167, 139, 250, 0.2)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(167, 139, 250, 0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{room.emoji}</div>
              <h3 style={{ marginBottom: '8px' }}>{room.name}</h3>
              <p className="muted" style={{ marginBottom: '12px' }}>{room.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                Enter Room →
              </div>
            </div>
          ))}
        </div>

        <section className="card elevated" style={{ marginTop: '24px' }}>
          <h3>🛡️ Safety & Moderation</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Report button on every message</li>
            <li style={{ marginBottom: '8px' }}>Moderated by trained volunteers</li>
            <li style={{ marginBottom: '8px' }}>No medical advice—just peer support</li>
            <li>Emergency helpline always available</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
