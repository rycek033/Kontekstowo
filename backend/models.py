from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    background_src = Column(String, nullable=False)

    items = relationship("Item", back_populates="room", cascade="all, delete-orphan")


class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    name = Column(String, nullable=False)
    src = Column(String, nullable=False)
    sound_src = Column(String, nullable=False)
    voice_src = Column(String, nullable=False)
    top = Column(String, nullable=False)
    left = Column(String, nullable=False)
    width = Column(String, nullable=False)

    room = relationship("Room", back_populates="items")
