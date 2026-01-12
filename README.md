# MindMaze — Multi-Page Application

A safe, anonymous emotional wellness platform for teenagers. Features mood tracking, journaling, stress-buster games, and peer support community.

## Quick Start

### Option 1: Python Flask Server (Recommended)

```powershell
# Install Python dependencies
pip install -r requirements.txt

# Build React frontend
npm run build

# Start Flask server
python app.py
```

Open **http://localhost:5000** in your browser.

### Option 2: Development Mode (Node.js + Vite)

```powershell
# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Features

- **🏠 Dashboard** — Overview of your emotional journey with mood tracking
- **📝 Journal** — Daily reflective writing with prompts
- **📚 Entry Log** — Browse, search, and filter all your entries with stats
- **🎮 Games** — Breathing exercises, focus games, and calming activities
- **💬 Community** — Topic-based peer support rooms (moderated)
- **👤 Profile** — Track achievements, stats, and settings

## Tech Stack

- **Frontend:** React 18 + React Router v7
- **Backend:** Flask 3.0 (Python)
- **Build:** Vite 5
- **Styling:** CSS (Purple/Dark theme, fully responsive)
- **Storage:** JSON files (user data), localStorage (frontend cache)
- **API:** RESTful endpoints for auth, moods, journal, chat

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/signin` | User login |
| POST | `/api/mood` | Record mood entry |
| GET | `/api/mood/<user_id>` | Get user moods |
| POST | `/api/journal` | Save journal entry |
| GET | `/api/journal/<user_id>` | Get journal entries |
| GET | `/api/chat/<room>` | Get room messages |
| POST | `/api/chat/<room>` | Post message to room |

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

dist/                      # Production build (React)
app.py                     # Flask server
data/                      # User data storage (JSON files)

