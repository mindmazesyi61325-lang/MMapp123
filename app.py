from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from pathlib import Path

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# Data directory for storing user data
DATA_DIR = Path('data')
DATA_DIR.mkdir(exist_ok=True)

# Helper functions for file-based storage
def get_user_data(user_id):
    """Get user data from JSON file"""
    user_file = DATA_DIR / f'user_{user_id}.json'
    if user_file.exists():
        with open(user_file, 'r') as f:
            return json.load(f)
    return None

def save_user_data(user_id, data):
    """Save user data to JSON file"""
    user_file = DATA_DIR / f'user_{user_id}.json'
    with open(user_file, 'w') as f:
        json.dump(data, f, indent=2)

# API Routes
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'MindMaze server is running',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """Sign up a new user"""
    data = request.json
    username = data.get('username', '').strip()
    age = data.get('age')

    if not username or len(username) < 3 or len(username) > 20:
        return jsonify({'error': 'Invalid username'}), 400

    if not age or age < 13:
        return jsonify({'error': 'Must be 13 or older'}), 400

    user_id = int(datetime.now().timestamp() * 1000)
    user_data = {
        'id': user_id,
        'username': username,
        'age': age,
        'createdAt': datetime.now().isoformat(),
        'moods': [],
        'journal': [],
        'chats': {}
    }

    save_user_data(user_id, user_data)
    return jsonify({
        'id': user_id,
        'username': username,
        'createdAt': user_data['createdAt']
    }), 201

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    """Sign in with username (simplified auth)"""
    data = request.json
    username = data.get('username', '').strip()

    if not username:
        return jsonify({'error': 'Username required'}), 400

    # For prototype: create or get user by username
    user_id = hash(username) % (10 ** 10)
    user_data = get_user_data(user_id)

    if not user_data:
        user_data = {
            'id': user_id,
            'username': username,
            'age': 13,
            'createdAt': datetime.now().isoformat(),
            'moods': [],
            'journal': [],
            'chats': {}
        }
        save_user_data(user_id, user_data)

    return jsonify({
        'id': user_data['id'],
        'username': user_data['username'],
        'createdAt': user_data['createdAt']
    }), 200

@app.route('/api/mood', methods=['POST'])
def record_mood():
    """Record a mood entry"""
    data = request.json
    user_id = data.get('userId')
    mood = data.get('mood')

    user_data = get_user_data(user_id)
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    mood_entry = {
        'mood': mood,
        'ts': datetime.now().isoformat()
    }
    user_data['moods'].append(mood_entry)
    save_user_data(user_id, user_data)

    return jsonify(mood_entry), 201

@app.route('/api/mood/<int:user_id>', methods=['GET'])
def get_moods(user_id):
    """Get all moods for a user"""
    user_data = get_user_data(user_id)
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(user_data['moods']), 200

@app.route('/api/journal', methods=['POST'])
def save_journal():
    """Save a journal entry"""
    data = request.json
    user_id = data.get('userId')
    text = data.get('text')
    prompt = data.get('prompt', 'How did today feel?')

    user_data = get_user_data(user_id)
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    entry = {
        'text': text,
        'prompt': prompt,
        'ts': datetime.now().isoformat()
    }
    user_data['journal'].append(entry)
    save_user_data(user_id, user_data)

    return jsonify(entry), 201

@app.route('/api/journal/<int:user_id>', methods=['GET'])
def get_journal(user_id):
    """Get all journal entries for a user"""
    user_data = get_user_data(user_id)
    if not user_data:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(user_data['journal']), 200

@app.route('/api/chat/<room>', methods=['GET'])
def get_chat_messages(room):
    """Get chat messages for a room"""
    messages_file = DATA_DIR / f'chat_{room}.json'
    if messages_file.exists():
        with open(messages_file, 'r') as f:
            return jsonify(json.load(f)), 200
    return jsonify([]), 200

@app.route('/api/chat/<room>', methods=['POST'])
def post_chat_message(room):
    """Post a chat message to a room"""
    data = request.json
    username = data.get('username')
    text = data.get('text')

    if not username or not text:
        return jsonify({'error': 'Missing username or text'}), 400

    messages_file = DATA_DIR / f'chat_{room}.json'
    messages = []
    if messages_file.exists():
        with open(messages_file, 'r') as f:
            messages = json.load(f)

    message = {
        'id': int(datetime.now().timestamp() * 1000),
        'user': username,
        'text': text,
        'ts': datetime.now().isoformat()
    }
    messages.append(message)

    with open(messages_file, 'w') as f:
        json.dump(messages, f, indent=2)

    return jsonify(message), 201

# Serve React frontend
@app.route('/', methods=['GET'])
def index():
    """Serve index.html for all non-API routes"""
    return send_from_directory('dist', 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    """Serve static assets"""
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    
    file_path = Path('dist') / path
    if file_path.exists() and file_path.is_file():
        return send_from_directory('dist', path)
    
    # Fallback to index.html for SPA routing
    return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    print("🚀 MindMaze Flask Server")
    print("📍 http://localhost:5000")
    print("🔌 API: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
