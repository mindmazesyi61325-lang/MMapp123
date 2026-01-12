import React, { useState, useEffect } from 'react'

export default function FocusGame({ onClose }){
  const [colors] = useState(['#a78bfa', '#ec4899', '#34d399', '#fbbf24'])
  const [grid, setGrid] = useState([])
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(30)

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setInterval(() => setTime(t => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (time === 0) {
      setGameOver(true)
    }
  }, [time, gameOver])

  function initGame(){
    const newGrid = Array(9).fill(0).map(() => Math.floor(Math.random() * 4))
    const randomTarget = Math.floor(Math.random() * 4)
    setGrid(newGrid)
    setTarget(randomTarget)
  }

  function handleClick(idx){
    if (gameOver) return
    if (grid[idx] === target) {
      setScore(s => s + 1)
      initGame()
    }
  }

  return (
    <div style={{ padding: '32px 24px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '8px' }}>Focus Game</h3>
      <p className="muted" style={{ marginBottom: '24px' }}>Find all squares of the target color</p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div>Score: <strong style={{ color: 'var(--primary)' }}>{score}</strong></div>
        <div>Time: <strong style={{ color: time < 10 ? '#ff6b6b' : 'var(--primary)' }}>{time}s</strong></div>
      </div>

      {target !== null && (
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: colors[target],
          margin: '0 auto 24px',
          border: '2px solid var(--primary)'
        }}></div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        maxWidth: '240px',
        margin: '0 auto 24px'
      }}>
        {grid.map((c, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              background: colors[c],
              cursor: gameOver ? 'default' : 'pointer',
              opacity: gameOver ? 0.5 : 1,
              transition: 'transform 0.2s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          ></div>
        ))}
      </div>

      {gameOver && (
        <div style={{
          padding: '16px',
          background: 'rgba(167, 139, 250, 0.1)',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <p style={{ margin: 0, color: 'var(--primary)' }}>
            Game Over! Final Score: <strong>{score}</strong>
          </p>
        </div>
      )}

      <div className="actions">
        <button className="btn ghost" style={{ flex: 1 }} onClick={onClose}>
          {gameOver ? 'Exit' : 'Quit'}
        </button>
        {gameOver && <button className="btn secondary" style={{ flex: 1 }} onClick={() => { initGame(); setScore(0); setTime(30); setGameOver(false) }}>Play Again</button>}
      </div>
    </div>
  )
}
