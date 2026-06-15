from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine, get_db
from models import Base, Item, Room
from schemas import RoomSchema


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        existing_room = db.query(Room).filter(Room.name == "Bedroom").first()
        if not existing_room:
            bedroom = Room(name="Bedroom", background_src="/graphics/rooms/bedroom.png")
            db.add(bedroom)
            db.flush()

            bed_item = Item(
                id="lozko_01",
                room_id=bedroom.id,
                name="Łóżko",
                src="/graphics/objects/bed.png",
                sound_src="/sounds/objects/bed.mp3",
                voice_src="/sounds/voice/bed_l.mp3",
                top="40%",
                left="30%",
                width="40%"
            )
            db.add(bed_item)
            db.commit()
    finally:
        db.close()

    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/rooms/{room_name}", response_model=RoomSchema)
def get_room(room_name: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.name == room_name).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room
