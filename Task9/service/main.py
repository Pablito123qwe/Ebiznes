from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests

app = FastAPI()

class UserRequest(BaseModel):
    message: str

class BotResponse(BaseModel):
    response: str


LLAMA_API_URL = "http://localhost:11434/v1/chat/completions"
OLLAMA_MODEL = "llama3.2:latest"
@app.post("/chat", response_model=BotResponse)
def chat(user_req: UserRequest):
    llama_payload = {
	"model": OLLAMA_MODEL,
         "messages": [
                    {"role": "system", "content": "Jesteś sprzedawcą aut. Wiesz wszystko an temat sprzedawanych przez siebie aut"},
                    {"role": "user", "content": user_req.message}
                ],
        "max_tokens": 256,
        "temperature": 0.7,
	"stream" : False
    }
    try:
        llama_response = requests.post(LLAMA_API_URL, json=llama_payload)
        data = llama_response.json()
        answer = data["choices"][0]["message"]["content"]
    except Exception as e:
        answer = f"Error: {e}"
    return BotResponse(response=answer)
