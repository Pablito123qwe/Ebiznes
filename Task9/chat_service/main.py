import os
import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Optional

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError(
        "Brak OPENAI_API_KEY"
    )

openai.api_key = OPENAI_API_KEY

app = FastAPI(
    title="ChatGPT FastAPI Service",
    version="1.0",
    description="Komunikacja z chatGPT"
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    max_tokens: Optional[int] = 150
    temperature: Optional[float] = 0.7


class ChatResponse(BaseModel):
    message: Message


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:

        completion = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[msg.dict() for msg in request.messages],
            max_tokens=request.max_tokens,
            temperature=request.temperature,
        )

        assistant_msg = completion.choices[0].message
        return ChatResponse(
            message=Message(
                role=assistant_msg["role"],
                content=assistant_msg["content"]
            )
        )

    except openai.OpenAIError as oe:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {oe}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
