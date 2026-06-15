# Kontekstowo

A web application supporting language and cognitive training for individuals with speech disorders (e.g., aphasia) within the realistic context of everyday scenes.

The user listens to a sound and points to the corresponding object in the scene. Correctly identified items are added to the inventory. Pronunciation audio can be played for the collected objects.

## Project Includes

- Frontend (React + Vite + TypeScript + Tailwind CSS)
- Backend API (FastAPI)
- SQLite Database
- Static assets

## Features

- Interactive scene with clickable objects
- Sound-to-image association training
- Voiceover playback (voice actor)

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: FastAPI
- Database: SQLite

## Requirements

- Node.js 20+
- npm 10+
- Python 3.11+
- bash (for the startup script)

## Quick Start

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## API

### GET `/api/rooms/{room_name}`

Returns the scene along with a list of objects.

Example:

```bash
curl http://localhost:8000/api/rooms/Bedroom
```

## Project Structure

```text
Kontekstowo/
|- backend/
|  |- main.py
|  |- models.py
|  |- schemas.py
|  |- database.py
|  `- requirements.txt
|- frontend/
|  |- src/
|  |- public/
|  |- package.json
|  `- tailwind.config.cjs
|- start.sh
`- README.md
```