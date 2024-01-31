
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
const API_KEY='RGAPI-db217079-3e3d-4bb3-9efc-1e3d77fc4144';


function SummonerProfile(props) {
    const [summonerData,setsummonerData]=useState();
    const [error,seterror]=useState(false);
    const location=useLocation();
    const prevState=location.state;
    const para=new URLSearchParams(location.search)
    const navigator=useNavigate();

    
    const apiRequest=async(prevState)=>{
        const summonerName=para.get('summonerName');
        
        if(summonerName===null){
            seterror(true);
            return {event:'nothing inputed'}; 
        }
        var summonerData={
            summonerProfile:null,
            summonerRankInfo:null,
        }
        // console.log(prevState.summonerName+' has been searched');
        const summonerApiCallString=`https://${Urls.getRegionRouter(para.get('region'))}/lol/summoner/v4/summoners/by-name/${para.get('summonerName')}?api_key=${API_KEY}`;
        try{
            const resp=await axios.get(summonerApiCallString);
            summonerData.summonerProfile= await resp.data;
            // console.log(summonerData)
        }catch(e){
            console.log("Error URL : "+summonerApiCallString);
            console.log(e);
            navigator('/SearchError');
            seterror(true);
            return 0;
        }
        try{
        const summonerRankCallString='https://'+Urls.getRegionRouter(para.get('region'))+'/lol/league/v4/entries/by-summoner/'+summonerData.summonerProfile.id+'?api_key='+API_KEY
        const resp=await axios.get(summonerRankCallString);
        summonerData.summonerRankInfo=resp.data;
        }catch(e){
            console.log(e);
        }
        setsummonerData(prev=>prev=summonerData) 
    }   
    useEffect(()=>{
        apiRequest(prevState);
    },[])

    console.log(summonerData)

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
 


