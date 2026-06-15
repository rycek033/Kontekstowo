# Kontekstowo

Aplikacja webowa wspierajaca trening jezykowy i poznawczy osob z zaburzeniami mowy (np. afazja) w realistycznym kontekscie scen codziennych.

Uzytkownik slucha dzwieku, wskazuje odpowiedni obiekt na scenie, a poprawnie rozpoznane elementy trafiaja do przybornika. Dla zebranych obiektow mozna odtworzyc wymowe.

## Co zawiera projekt

- Frontend (React + Vite + TypeScript + Tailwind CSS)
- Backend API (FastAPI + SQLAlchemy)
- Baze SQLite z automatyczna inicjalizacja przy starcie backendu
- Zasoby statyczne: grafiki i dzwieki sceny

## Najwazniejsze funkcje

- Interaktywna scena z klikalnymi obiektami
- Trening skojarzen dzwiek-obraz
- Informacja zwrotna po poprawnej i blednej odpowiedzi
- Przybornik z juz rozpoznanymi obiektami
- Odtwarzanie nagrania glosowego nazwy obiektu
- Przelaczanie motywu jasny/ciemny z zapamietywaniem preferencji

## Stos technologiczny

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Backend: FastAPI, SQLAlchemy, Uvicorn
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

Backend bedzie dostepny pod adresem: `http://localhost:8000`

### 2. Frontend

W nowym terminalu:

```bash
cd frontend
npm install
npm run dev
```

Frontend bedzie dostepny pod adresem: `http://localhost:5173`

## Uruchamianie jednym poleceniem

W katalogu glownym projektu:

```bash
chmod +x start.sh
./start.sh
```

Skrypt uruchamia backend i frontend. Zatrzymanie frontendu konczy tez proces backendu.

## API

### GET `/api/rooms/{room_name}`

Zwraca scene wraz z lista obiektow.

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

## Uwagi

- Przy pierwszym starcie backend tworzy tabele i dodaje przykladowa scene `Bedroom`, jesli nie istnieje.
- Frontend laczy sie z backendem przez `http://localhost:8000`.
- CORS jest skonfigurowany dla `http://localhost:5173`.

## Licencja

Brak zdefiniowanej licencji. Jesli projekt ma byc publikowany, dodaj plik `LICENSE`.
