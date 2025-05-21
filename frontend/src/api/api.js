import axios from "axios";

export const fetchMatchHistory = async({gameName, tagLine, localRegion, region}) =>{
    const responce =  await axios.get(
        "http://127.0.0.1:8000/match_history",
        {
            params: {
                    gameName,
                    tagLine, 
                    localRegion,
                    region
                }
            }
    );
    return responce.data;
}
export const fetchSpells = async() => {
        const responce = await axios.get("https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/summoner.json");
        return responce.data.data;
}


export const fetchChampionStats = async({gameName, tagLine, localRegion, region}, count) => {
    const responce = await axios.get(
        "http://127.0.0.1:8000/champion_stats",
        {
            params: 
            {
                gameName,
                tagLine,
                localRegion,
                region,
                count
            }
        }
    );
    return responce.data;
}

export const fetchChampJson = async() =>{
    const champions =  await axios.get("https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/champion.json")
    return champions.data.data
}