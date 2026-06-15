from pydantic import BaseModel


class ItemSchema(BaseModel):
    id: str
    name: str
    src: str
    sound_src: str
    voice_src: str
    top: str
    left: str
    width: str

    model_config = {"from_attributes": True}


class RoomSchema(BaseModel):
    id: int
    name: str
    background_src: str
    items: list[ItemSchema]

    model_config = {"from_attributes": True}
