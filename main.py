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
    try:
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as err:
        raise HTTPException(status_code=response.err.status_code, detail="Summoner not found")


@app.get("/{gameName}/{tagLine}/rank_status")
def get_my_summoner_stats(gameName: str, tagLine:str, localRegion: str = "ru", region: str = "europe"):
    puuid = requests.get(f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={RIOT_API_KEY}").json()["puuid"]
    url = f"https://{localRegion}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}?api_key={RIOT_API_KEY}"
    response = requests.get(url)
    try:
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as err:
        raise HTTPException(status_code = response.err.status_code, detail = "Summoner not found")


@app.get("/{gameName}/{tagLine}/champ_mastery")
def summoner_champ_mastery(gameName:str, tagLine:str, localRegion:str="ru", region:str = "europe"):
    puuid = requests.get(f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}?api_key={RIOT_API_KEY}").json()["puuid"]
    url = f"https://{localRegion}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}?api_key={RIOT_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(404, "SummonerNotFound")
    return response.json()
