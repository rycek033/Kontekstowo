# Kontekstowo

Aplikacja webowa wspierajaca trening jezykowy i poznawczy osob z zaburzeniami mowy (np. afazja) w realistycznym kontekscie scen codziennych.

Uzytkownik slucha dzwieku, wskazuje odpowiedni obiekt na scenie, a poprawnie rozpoznane elementy trafiaja do przybornika. Dla zebranych obiektow mozna odtworzyc wymowe.

## Projekt zawiera

- Frontend (React + Vite + TypeScript + Tailwind CSS)
- Backend API (FastAPI)
- Baze SQLite 
- Zasoby statyczne 

## Funkcje

- Interaktywna scena z klikalnymi obiektami
- Trening skojarzeń dzwiek-obraz
- Odtwarzanie nagrania głosowego (lektor)

## Stos technologiczny

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: FastAPI
- Baza danych: SQLite

## Wymagania

- Node.js 20+
- npm 10+
- Python 3.11+
- bash (dla skryptu startowego)

## Szybki start

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend

W nowym terminalu:

```bash
cd frontend
npm install
npm run dev
```

## API

### GET `/api/rooms/{room_name}`

Zwraca scenę wraz z listą obiektów.

Przyklad:

```bash
curl http://localhost:8000/api/rooms/Bedroom
```

## Struktura projektu

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
