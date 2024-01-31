

const express = require("express");
const cors = require("cors");
const app = express();
const axios=require('axios')
const {db}=require('./firebase-config.js');





const riot_api_key='RGAPI-46e12e5a-5907-44b4-8e6c-ac86fe14662e'




app.use(cors());
app.use(express.json());

const take_features_from_matchData=(matchData)=>{
    console.log(matchData)
    const feature={
        "version":matchData.info.gameVersion.match(/^(\d+\.\d+\.)/)[0]+'1',
        "platformId":matchData.info.platformId,
        "matchId":matchData.metadata.matchId,
        'gameMode':matchData.info.gameMode,
        'gameStartTimestamp':matchData.info.gameStartTimestamp,
        'gameDuration':matchData.info.gameDuration,
        "participants":matchData.info.participants.map((element)=>{
            return ({
                "summonerName":element.summonerName,
                "summonerId":element.summonerId,
                "championName":element.championName,
                "kills":element.kills,
                "assists":element.assists,
                "deaths":element.deaths,
                "teamPosition":element.teamPosition,
                "profileIcon":element.profileIcon,
                "summoner1Id":element.summoner1Id,
                "summoner2Id":element.summoner2Id,
                "items":[element.item0,element.item1,element.item2,element.item3,element.item4,element.item4,element.item5],
                "primeRune":element.perks.styles[0].selections[0].perk,
                "secondRune":element.perks.styles[1].style,
                "win":element.win,
            })
        })
    }
    console.log(feature)
    return feature
}


app.get('/tw_checkAndRemoveChallengerSummoner',async(req,res)=>{
    
})

app.get('/tw_fetchChallengerSummoner',async(req,res)=>{
    const challengerSummoners_url=`https://${'tw2'}.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${'RANKED_SOLO_5x5'}?api_key=${riot_api_key}`;
    // console.log(challengerSummoners_url)
    const resp_challengerSummoners=await axios.get(challengerSummoners_url)
    const challengerSummoners_arr=await resp_challengerSummoners.data
    const summonerNames=challengerSummoners_arr.entries.map(e=>e.summonerName)
    console.log(summonerNames)

    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetchDataWithRetry(url, retryDelay = 20000, maxAttempts = 10) {
        let attempts = 0;
    
        while (attempts < maxAttempts) {
            try {
                const response = await axios.get(url);
                return response.data; // 請求成功，返回數據
            } catch (error) {
                console.log(`Error fetching URL ${url}:`, error.response.status);
                attempts++;
    
                // 如果達到最大嘗試次數，拋出錯誤
                if (attempts >= maxAttempts) {
                    throw error;
                }
    
                // 等待一定時間後再嘗試
                console.log(`Waiting for ${retryDelay / 1000} seconds before retrying...`);
                await delay(retryDelay);
            }
        }
    }
    async function fetchMatchIdsWithRetry(puuid,startTime,count,maxAttempts){
        let attempts=0;
        const url=`https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${startTime}&count=${count}&type=ranked&api_key=RGAPI-db217079-3e3d-4bb3-9efc-1e3d77fc4144`
        console.log(url)
        while(attempts<maxAttempts){
            try{
                const resp=await axios.get(url);
                const matchIds=await resp.data;
                // console.log(matchIds)
                return matchIds;
            }catch(error){
                console.log('Error Code: '+error.response.status)   
                if (attempts >= maxAttempts) {
                    throw error;
                }
                attempts++;
                console.log(`Waiting for ${retryDelay / 1000} seconds before retrying...`);
                await delay(retryDelay);        
            }
        }
    }
    async function fetchSummonerRankWithRetry(id,maxAttempts){
        let attempts=0
        while(attempts<maxAttempts){
            try{
                const summonerRank_url=`https://tw2.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-db217079-3e3d-4bb3-9efc-1e3d77fc4144`;
                const resp= await axios.get(summonerRank_url);
                const summonerRankData=await resp.data;
                // console.log(summonerRankData)
                return summonerRankData;
            }catch(error){
                console.log("fetch summoner rank data Error: "+error.response.status);
                if (attempts >= maxAttempts) {
                    throw error;
                }
                attempts++; 
                console.log(`Waiting for ${retryDelay / 1000} seconds before retrying...`);
                await delay(retryDelay);
            }
        }
    }
    const storeSummonerIntoFirestore=async(summonerData,rank)=>{
        try{
            const docRef=db.collection('summoners').doc(summonerData.id);
            const setStatus=await docRef.set({
                summoner:summonerData,
                rank:rank,
            })
            console.log({
                summoner:summonerData,
                rank:rank,
            })
        }catch(error){
            console.log(error)
        }
    }

    // console.log(db)
    let summonerFatched=[]
    for(summonerName of summonerNames){
        const summoner_url=`https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-db217079-3e3d-4bb3-9efc-1e3d77fc4144`
        
        try{
            const summonerData=await fetchDataWithRetry(summoner_url,20000,3);
            summonerFatched.append(summonerData.name);
            console.log('Fetched data from URL:', summoner_url, summonerData);
            const summonerRankData=await fetchSummonerRankWithRetry(summonerData.id,10);
            
            // console.log(summonerRankData)
            storeSummonerIntoFirestore(summonerData,summonerRankData)


        }catch(error){
                console.log('Error fetching URL')
        }
    }
    res.json({summonerFatched})

})

app.get("/", (req, res) => {
    console.log('this is /')
  res.json({ message: "Hello from server!" });
});

app.listen(process.env.PORT||8000, () => {
  console.log(`Server is running on port 8000.`);
});