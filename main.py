from fastapi import FastAPI
import json
import os
import requests
from fastapi import HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

load_dotenv("./API.env")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

RIOT_API_KEY = os.getenv("RIOT_API_KEY")

@app.get("/")
def read_root():
    return {"Hello": "FastAPI"}

@app.get("/{gameName}/{tagLine}")
def get_summoner_puuid(gameName: str, tagLine:str, region:str = "europe"):
    url = f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={RIOT_API_KEY}"
    response =  requests.get(url)
    puuid = response.json()["puuid"]
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Summoner not found")
    return puuid

@app.get("/{gameName}/{tagLine}/champ_mastery")
def summoner_champ_mastery(gameName:str, tagLine:str, region:str="ru", globalRegion:str = "europe"):
    puuid = requests.get(f"https://{globalRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={RIOT_API_KEY}").json()["puuid"]
    url = f"https://ru.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top?count=5&api_key={RIOT_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(404, "SummonerNotFound")
    return response.json()
