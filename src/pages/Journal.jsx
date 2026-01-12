import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

export default function Journal({ user, onLogout }){
  const [journal, setJournal] = useState('')
  const [entries, setEntries] = useState([])
  const [prompt, setPrompt] = useState('How did today feel?')

  const prompts = [
    'How did today feel?',
    'What made me smile today?',
    'What am I grateful for?',
    'What worried me today?',
    'What did I learn?',
    'What would I change about today?'
  ]

  useEffect(() => {
    const raw = localStorage.getItem('mm-journal')
    if (raw) setEntries(JSON.parse(raw))
  }, [])

  function saveEntry(){
    if (!journal.trim()) return
    const item = { text: journal.trim(), ts: Date.now(), prompt }
    const next = [item, ...entries]
    setEntries(next)
    localStorage.setItem('mm-journal', JSON.stringify(next))
    setJournal('')
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ marginBottom: '24px' }}>📝 Daily Journal</h1>

        <div className="grid">
          <section className="card elevated" style={{ gridColumn: 'span 2' }}>
            <h3>Write Your Thoughts</h3>
            <p className="muted" style={{ marginBottom: '16px' }}>
              Your entries are private and encrypted. No judgment, just you.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label>Today's Prompt (choose one):</label>
              <select value={prompt} onChange={e => setPrompt(e.target.value)} style={{ marginTop: '4px' }}>
                {prompts.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label>Your Entry:</label>
              <textarea 
                value={journal} 
                onChange={e => setJournal(e.target.value)} 
                placeholder="Write freely... there are no rules here."
                style={{ minHeight: '200px' }}
              ></textarea>
            </div>

            <div className="actions">
              <button className="btn secondary" onClick={saveEntry} disabled={!journal.trim()}>
                Save Entry
              </button>
              <button className="btn ghost" onClick={() => setJournal('')}>
                Clear
              </button>
            </div>
          </section>

          <section className="card elevated">
            <h3>Writing Tips</h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Be honest with yourself</li>
              <li style={{ marginBottom: '8px' }}>Write without judgment</li>
              <li style={{ marginBottom: '8px' }}>There's no "right" way</li>
              <li style={{ marginBottom: '8px' }}>Revisit old entries</li>
              <li>See your growth over time</li>
            </ul>
          </section>
        </div>

        {entries.length > 0 && (
          <section className="card elevated" style={{ marginTop: '24px' }}>
            <h3>Recent Entries ({entries.length})</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {entries.slice(0, 10).map((e, i) => (
                <div className="entry" key={i}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '6px' }}>
                    {e.prompt}
                  </div>
                  <div className="entry-text">{e.text}</div>
                  <div className="entry-meta muted small">
                    {new Date(e.ts).toLocaleDateString()} at {new Date(e.ts).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
