
import React, { PureComponent ,Component,useState, useEffect,useRef} from 'react';
import axios from 'axios'
import Urls from '../../urls';
import '../../css/matchlist.css'
import {  useNavigate } from 'react-router-dom';
import LoadingBar from '../LoadingBar';
import { useTranslation } from 'react-i18next';
import SoleRank from './Gamemodes/soleRank.jsx'
import Cherry from './Gamemodes/cherry.jsx';
import Aram from './Gamemodes/aram.jsx';
import { collection, getDocs,getDoc, doc, query, limit ,addDoc, setDoc} from "firebase/firestore";
import { db } from "../../firebase-config.js";



const  MatchesList =(props)=>{
    const [matchesData_arr,setMatchesData_arr]=useState(new Array());
    const [pagesCounter,setPagesCounter]=useState(0); //for counting how many matches has been loaded
    const [loading,setLoading]=useState(false);
    // const [isMatchExsits,setIsMatchExsits]=useState();
    const {t}=useTranslation();
    useEffect(()=>{
        getMatchData(0);
    },[])
    // useEffect(()=>{
    //     // console.log(isMatchExsits)    
    // },[isMatchExsits])


    const checkMatchExsitance=async(docId)=>{
        const docRef = doc(db, 'matchesData', docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists()
    }

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

    const getMatchData=async(start)=>{
        // const tier=props.playerRankInfo.filter((x)=>x.queueType==="RANKED_SOLO_5x5")[0].tier;
        let data={
            matchesId_arr:new Array(),
            matchesData_arr:new Array(),
        }
        setLoading(true);
        if(loading===true){
            console.log('loading for matches');
        }
        const requestMatchesListUrl=`https://${Urls.getRealmRouter(props.region)}/lol/match/v5/matches/by-puuid/${props.puuid}/ids?api_key=${props.API_KEY}&count=10&start=${start}`
        console.log(requestMatchesListUrl)
        try{
            const resp=await axios.get(requestMatchesListUrl);
            data.matchesId_arr=await resp.data;
            
            for(let i=0;i<data.matchesId_arr.length;i++){
                const isMatchExsits=await checkMatchExsitance(data.matchesId_arr[i])
                if(isMatchExsits){
                    console.log(data.matchesId_arr[i]+' exsits')
                    const platformId = data.matchesId_arr[i].match(/^.*(?=_)/)[0];
                    console.log(platformId)
                    const match_ref=doc(db,platformId+'_matchesData',data.matchesId_arr[i]);
                    const getMatchFromFirestore=async()=>{
                        const matchDoc=await getDoc(match_ref);
                        data.matchesData_arr.push(matchDoc.data());
                    }
                    getMatchFromFirestore()
                    console.log(data.matchesData_arr)
                }else{
                    console.log(data.matchesId_arr[i]+' does not exsits')
                    const requestMatchDataUrl=`https://${Urls.getRealmRouter(props.region)}/lol/match/v5/matches/${data.matchesId_arr[i]}?api_key=${props.API_KEY}`;
                    const respMatchData=await axios.get(requestMatchDataUrl);
                    const match=take_features_from_matchData(respMatchData.data);
                    data.matchesData_arr.push(match);
                    const match_ref = doc(db, match.platformId+'_matchesData', match.matchId);
                    setDoc(match_ref, match);
                }
            }
        }catch(e){
            console.log(e)
        }
        console.log(data.matchesId_arr)
        data.matchesData_arr=matchesData_arr.concat(data.matchesData_arr);
        setMatchesData_arr(prev=>prev.matchesData_arr=data.matchesData_arr);
        setLoading(false);
    }

    const handleMore=(e)=>{
        e.currentTarget.disabled=true;
        getMatchData((pagesCounter+1)*10);
        setPagesCounter(pagesCounter+1);
        e.currentTarget.disabled=false;   
    }
    const handleGameModes=(match)=>{
        if(match.gameMode==="CHERRY"){
            return(<><Cherry match={match} summonerProfile={props.summonerProfile} region={props.region} /></>)
        }else if(match.gameMode==="CLASSIC"){
            return(<><SoleRank match={match} summonerProfile={props.summonerProfile} region={props.region} /></>)
        }else if(match.gameMode==="ARAM"){
            return(<><Aram  match={match} summonerProfile={props.summonerProfile} region={props.region}/></>)
        }
    }
    console.log(matchesData_arr)
    return (
        <div className='container'>
            <ul>
                {matchesData_arr.map((match,index)=>{
                    return (
                        <li className='gameslist' key={index} >
                            {match.matchId}<br></br>
                            {match.version}
                            {handleGameModes(match)}
                        </li>
                    )
                })}
            </ul>
            {loading?< LoadingBar />:null}
            <div className='more-button'>
                {matchesData_arr.length!=0?<button onClick={handleMore}>more</button>:null
            }</div>
        </div>
    );
}


 
export default MatchesList;

