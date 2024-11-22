import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerProfile from "../components/playerProfile";
import MatchesList from '../components/MatchesLists/MatchesList.jsx'
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from 'axios'
import Urls from '../urls'
import LoadingAnimation from '../components/LoadingAnimation.jsx'
import '../css/summonerProfile.css';
import ErrorPage from "./ErrorPage.js";
import { connectAuthEmulator } from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
const API_KEY='RGAPI-db217079-3e3d-4bb3-9efc-1e3d77fc4144';


function SummonerProfile(props) {
    const [summonerData,setsummonerData]=useState();
    const [error,seterror]=useState(false);
    const location=useLocation();
    const prevState=location.state;
    const para=new URLSearchParams(location.search)
    const navigator=useNavigate();

    
    const apiRequest=async(prevState)=>{

        // 如果存在 summonerId，直接使用它來請求召喚師資料
        // If summonerId exists, use it to request summoner data directly
        const summonerId = para.get('summonerId');
        const summonerName=para.get('summonerName');
        if(summonerId) {
            console.log('summonerId exists');
            try {
                const summonerResp = await axios.get(
                    `https://${Urls.getRegionRouter(para.get('region'))}/lol/summoner/v4/summoners/${summonerId}`,
                    {
                        params: {
                            api_key: API_KEY
                        }
                    }
                );
                
                const rankResp = await axios.get(
                    `https://${Urls.getRegionRouter(para.get('region'))}/lol/league/v4/entries/by-summoner/${summonerId}`,
                    {
                        params: {
                            api_key: API_KEY
                        }
                    }
                );

                setsummonerData({
                    summonerProfile: summonerResp.data,
                    summonerRankInfo: rankResp.data
                });
            } catch(e) {
                console.error(e);
                navigator('/SearchError');
                seterror(true);
                return 0;
            }
        }else{
            if(summonerName===null){
                seterror(true);
                return {event:'nothing inputed'}; 
            }
            var summonerData={
                summonerProfile:null,
                summonerRankInfo:null,
            }
            
            const paramtersPassingToServer={
                RealmRouter:Urls.getRealmRouter(para.get('region')),
                regionRouter:Urls.getRegionRouter(para.get('region')),
                summonerName:para.get('summonerName'),
                region:para.get('region'),
                API_KEY:API_KEY,
                targetline:para.get('targetline')?para.get('targetline'):para.get('region'),
            }
            console.log(paramtersPassingToServer)
            
            try{
                const resp=await axios.get(
                    // 'http://127.0.0.1:5001/riftgg-4c815/us-central1/requestAccountFromRiotAPI',  //tset 
                    'https://us-central1-riftgg-4c815.cloudfunctions.net/requestAccountFromRiotAPI', //prac
                    {
                        params:paramtersPassingToServer,
                        headers:{
                            'Content-Type':'application/json',
                        }
                    }
                );
                
                summonerData.summonerProfile=resp.data;
                
                // Continue with rank info request if needed
                if(summonerData.summonerProfile?.id){
                    const summonerRankCallString=`https://${Urls.getRegionRouter(para.get('region'))}/lol/league/v4/entries/by-summoner/${summonerData.summonerProfile.id}?api_key=${API_KEY}`;
                    const rankResp=await axios.get(summonerRankCallString);
                    summonerData.summonerRankInfo=rankResp.data;
                }
                console.log(summonerData)
                setsummonerData(summonerData);
            }catch(e){
                console.error(e);
                navigator('/SearchError');
                seterror(true);
                return 0;
            }
        }
    }   
    useEffect(()=>{
        apiRequest(prevState);
    },[])



    return (
        // <LanguageUseContex.Provider value={}>
            <React.Fragment>
                <NavBar  />
                {error?<ErrorPage />:
                    summonerData!==undefined?
                    <div style={{marginTop:'30px'}}>
                        <PlayerProfile playerRankInfo={summonerData.summonerRankInfo}  playerProfile={summonerData.summonerProfile}/>
                        <MatchesList playerRankInfo={summonerData.summonerRankInfo} puuid={summonerData.summonerProfile.puuid} API_KEY={API_KEY} summonerProfile={summonerData.summonerProfile}
                        region={para.get('region')} />
                    </div>

                    :<LoadingAnimation />
                }
                
            </React.Fragment> 
        // </LanguageUseContex.Provider>


     );
}


export default SummonerProfile;
 


