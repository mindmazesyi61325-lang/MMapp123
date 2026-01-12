# MindMaze — Multi-Page Application

A safe, anonymous emotional wellness platform for teenagers. Features mood tracking, journaling, stress-buster games, and peer support community.

## Features

- **🏠 Dashboard** — Overview of your emotional journey with mood tracking
- **📝 Journal** — Daily reflective writing with prompts
- **📚 Entry Log** — Browse, search, and filter all your entries with stats
- **🎮 Games** — Breathing exercises, focus games, and calming activities
- **💬 Community** — Topic-based peer support rooms (moderated)
- **👤 Profile** — Track achievements, stats, and settings

## Tech Stack

- **Frontend:** React 18 + React Router v7
- **Build:** Vite 5
- **Styling:** CSS (Purple/Dark theme, fully responsive)
- **Storage:** localStorage (prototype)
- **Data:** Client-side persistence

## Quick Start

Install dependencies and run:

```powershell
npm install
npm run dev
```

Open **http://localhost:5174** in your browser.

### Build for Production

```powershell
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── Landing.jsx       # Landing page
│   ├── SignUp.jsx        # Account creation
│   ├── SignIn.jsx        # Login
│   ├── Dashboard.jsx     # Home page
│   ├── Journal.jsx       # Writing page
│   ├── EntryLog.jsx      # Entry archive with filtering
│   ├── Games.jsx         # Games hub
│   ├── Community.jsx     # Chat rooms
│   └── Profile.jsx       # User profile & settings
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   ├── BreathingGame.jsx # Breathing exercise
│   ├── FocusGame.jsx     # Color matching game
│   └── CalmingGame.jsx   # Release & reflect activity
├── App.jsx               # Router setup
├── main.jsx              # React bootstrap
└── styles.css            # Global styles
```

## Data Stored (localStorage)

- `mm-user` — Current user session
- `mm-journal` — Journal entries with timestamps
- `mm-moods` — Mood tracking data
- `mm-chat-messages` — Community chat messages

## Design Notes

- Purple/dark theme with gradient accents
- Minimalist, attractive UI
- Soft animations and micro-interactions
- Fully responsive grid layouts
- Crisis support prominently featured

## Notes for Next Steps

- Connect backend API (Node.js/Express or Firebase)
- Add real-time chat with moderation
- Implement data encryption for journals
- Add push notifications
- Build mobile app (React Native)
- Add AI-assisted mood insights (non-diagnostic)

---

**Not a therapy platform.** Emergency support: Call 988 (US) · For ages 13+

