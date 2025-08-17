from fastapi import FastAPI, HTTPException, Query, Depends, Request
from sqlmodel import SQLModel, Field, create_engine, Session, select, func
from pydantic import BaseModel
from datetime import date
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re
from typing import Set
from typing import Dict
from typing import List

import os

DB_URL = "sqlite:///thewall.db"
DELETE_PASSWORD = os.getenv("thewall_DELETE_PASSWORD", "natsnats")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"error": "Too many requests, please slow down.", "code": 4003}
    )


class thewallEntry(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    date: date
    recipient: str = Field(default="", nullable=True)
    contents: str

engine = create_engine(DB_URL, echo=True)
SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


class EntryCreate(BaseModel):
    date: date
    recipient: str = ""
    contents: str


def normalize_text(text: str) -> str:
    text = re.sub(r'[^a-zA-Z]', '', text.lower())
    
    normalized = []
    for char in text:
        if len(normalized) == 0 or char != normalized[-1]:
            normalized.append(char)
    
    return ''.join(normalized)


def contains_slur(text: str, blocklist: Set[str]) -> bool:
    normalized_text = normalize_text(text)
    
    for blocked_word in blocklist:
        if blocked_word in normalized_text:
            return True
    
    lowered_text = text.lower()
    for blocked_word in blocklist:
        if blocked_word in lowered_text:
            return True
    
    return False


@app.post("/thewall/", response_model=thewallEntry)
@limiter.limit("100/minute")
def create_entry(entry: EntryCreate, session: Session = Depends(get_session), request: Request = None):
    existing_entry = session.exec(
        select(thewallEntry).where(thewallEntry.contents == entry.contents)
    ).first()
    if existing_entry:
        raise HTTPException(
            status_code=400,
            detail="Duplicate content not allowed.",
            headers={"X-Error-Code": "4001"}
        )

    NORMALIZED_BLOCKLIST = {
        "niga",     
        "fagot",   
        "kike",
        "chink",
        "whore",   
        "cunt",
        "retard",
        "spic",
        "wetback",
        "towelhead",
        "raghead",
        "sandniger",
        "trany",    
        "dyke",
        "fag",    
        "homo"
    }

    if contains_slur(entry.contents, NORMALIZED_BLOCKLIST):
        raise HTTPException(
            status_code=400,
            detail="Message contains banned slurs.",
            headers={"X-Error-Code": "4002"}
        )

    if entry.recipient and contains_slur(entry.recipient, NORMALIZED_BLOCKLIST):
        raise HTTPException(
            status_code=400,
            detail="Recipient contains banned slurs.",
            headers={"X-Error-Code": "4003"}
        )

    db_entry = thewallEntry.from_orm(entry)
    session.add(db_entry)
    session.commit()
    session.refresh(db_entry)
    return db_entry



@app.get("/thewall/")
def list_entries(
    session: Session = Depends(get_session),
    limit: int = Query(10, gt=0),
    offset: int = Query(0, ge=0)
) -> Dict:
    stmt = select(thewallEntry).order_by(thewallEntry.id.desc()).limit(limit).offset(offset)
    results = session.exec(stmt).all()
    
    total = session.exec(select(func.count()).select_from(thewallEntry)).one()
    has_more = offset + limit < total
    
    items = [{"id": item.id, "contents": item.contents, "recipient": item.recipient, "date": item.date} for item in results]
    
    return {"items": items, "has_more": has_more, "total": total}


@app.delete("/thewall/{entry_id}")
def delete_entry(
    entry_id: int,
    password: str,
    session: Session = Depends(get_session)
):
    if password != DELETE_PASSWORD:
        raise HTTPException(status_code=403, detail="Invalid password")
    entry = session.get(thewallEntry, entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    session.delete(entry)
    session.commit()
    return {"detail": "Deleted successfully"}