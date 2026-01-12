import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

export default function EntryLog({ user, onLogout }){
  const [allEntries, setAllEntries] = useState([])
  const [allMoods, setAllMoods] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const rawEntries = localStorage.getItem('mm-journal')
    if (rawEntries) setAllEntries(JSON.parse(rawEntries))
    const rawMoods = localStorage.getItem('mm-moods')
    if (rawMoods) setAllMoods(JSON.parse(rawMoods))
  }, [])

  // Filter entries based on search and date
  const filtered = allEntries.filter(e => {
    const matchesSearch = e.text.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'all') return matchesSearch
    if (filter === 'week') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      return e.ts > weekAgo && matchesSearch
    }
    if (filter === 'month') {
      const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
      return e.ts > monthAgo && matchesSearch
    }
    return matchesSearch
  })

  const moodEmojis = { happy: '😊', sad: '😢', anxious: '😰', calm: '😌', energetic: '🤩' }

  // Calculate stats
  const totalEntries = allEntries.length
  const thisWeek = allEntries.filter(e => e.ts > Date.now() - 7 * 24 * 60 * 60 * 1000).length
  const thisMonth = allEntries.filter(e => e.ts > Date.now() - 30 * 24 * 60 * 60 * 1000).length

  // Most common mood
  const moodCounts = {}
  allMoods.forEach(m => {
    moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1
  })
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ marginBottom: '24px' }}>📚 Entry Log</h1>

        {/* Stats Cards */}
        <div className="grid" style={{ marginBottom: '24px' }}>
          <div className="card elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalEntries}</div>
            <div className="muted small">Total Entries</div>
          </div>
          <div className="card elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>{thisWeek}</div>
            <div className="muted small">This Week</div>
          </div>
          <div className="card elevated">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{thisMonth}</div>
            <div className="muted small">This Month</div>
          </div>
          {topMood && (
            <div className="card elevated">
              <div style={{ fontSize: '2rem' }}>{moodEmojis[topMood[0]]}</div>
              <div className="muted small">Most Common Mood</div>
            </div>
          )}
        </div>

        {/* Filters & Search */}
        <section className="card elevated" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>Filter & Search</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Time Period</label>
              <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All Time</option>
                <option value="month">Last Month</option>
                <option value="week">Last Week</option>
              </select>
            </div>
            <div className="form-group">
              <label>Search Entries</label>
              <input
                type="text"
                placeholder="Search your memories..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <p className="muted small" style={{ margin: '12px 0 0 0' }}>
            Showing {filtered.length} of {allEntries.length} entries
          </p>
        </section>

        {/* Entry List */}
        <section className="card elevated">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ fontSize: '3rem', margin: '0 0 12px 0' }}>📭</p>
              <p className="muted">No entries found. Start writing to see your journey!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filtered.map((e, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'rgba(167, 139, 250, 0.05)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  transition: 'all 0.3s'
                }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(167, 139, 250, 0.08)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {e.prompt}
                      </div>
                      <div className="muted small">
                        {new Date(e.ts).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(e.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>
                      {e.text.length} characters
                    </div>
                  </div>
                  <div style={{
                    padding: '12px',
                    background: 'var(--bg-light)',
                    borderRadius: '8px',
                    marginTop: '8px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: 'var(--text-muted)'
                  }}>
                    {e.text.length > 200 ? e.text.substring(0, 200) + '...' : e.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
