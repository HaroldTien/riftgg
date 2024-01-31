import React,{Component} from "react";
import PlayerRank from "./playerRank";
import "../css/playerProfile.css"
import { useTranslation } from 'react-i18next';
import Urls from "../urls.js";
import '../i18n.js'; // Import your i18n configuration


const PlayerProfile=(props)=>{
    const {t}=useTranslation();
     
    const profileIconSource=Urls.summoner_profile_icon_url+props.playerProfile.profileIconId+'.png';
    return (
        <div className="containter">
            <h3 >{t('summonerName')} : {props.playerProfile.name} </h3>
            <h3>{t("summonerLevel")} : {props.playerProfile.summonerLevel}</h3>
            <img  width='100' height='100' style={{border:'3px solid purple'}} src={profileIconSource}></img>
            { props.playerRankInfo.length=== 0 ?
                <h3> {t("NoRank")}</h3>
                :
                <PlayerRank playerRankInfo={props.playerRankInfo} />
            }
        </div>
    );
}

 
export default PlayerProfile;
