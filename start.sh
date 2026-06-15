#!/bin/bash

cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000 & BACKEND_PID=$!

cd ..

cd frontend
npm run dev

trap "kill $BACKEND_PID" EXIT