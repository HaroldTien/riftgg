import React,{Component} from "react";
import { useTranslation } from 'react-i18next';
// player who played flex rank doraemon
function PlayerRank(props) { 
    const {t}=useTranslation();
    const soleRank=props.playerRankInfo.filter((mode)=>mode.queueType==="RANKED_SOLO_5x5");
    const flexRank=props.playerRankInfo.filter((mode)=>mode.queueType==="RANKED_FLEX_SR");
    // console.log(`../img/ranked-emblems/Emblem_${flexRank[0].tier[0]}${flexRank[0].tier.replace(flexRank[0].tier[0],'').toLowerCase()}.png`)
    
    return ( 
        // <>{props.playerRankInfo.filter((mode)=>mode.queueType==="RANKED_SOLO_5x5")[0].queueType}</>
        <div className="rank" >                
            {soleRank.length!==0?
                <div className='solo-rank'>
                <h2> {t('rank')} </h2>
                <h3>{t(soleRank[0].tier)} {props.playerRankInfo.filter((mode)=>mode.queueType==="RANKED_SOLO_5x5")[0].rank} ({t('sole')})</h3>
                <h4 > {soleRank[0].leaguePoints} LP {soleRank[0].inactive===true?'(inactive)':null}</h4>
                <img width='100' height='100'  src={soleRank[0].length!==0 ? 
                    require(`../img/ranked-emblems/Emblem_${soleRank[0].tier[0]}${soleRank[0].tier.replace(soleRank[0].tier[0],'').toLowerCase()}.png`) : null} ></img>
                </div>
            :null}

            {flexRank.length!==0&&flexRank[0].tier!=='EMERALD'?                
                <div className="flex-rank">
                    <h3>{flexRank[0].tier} {flexRank[0].rank} {t('flex')}</h3>
                    <h4 > {flexRank[0].leaguePoints} LP {flexRank[0].inactive===true?'(inactive)':null} </h4>
                    {/* {flexRank[0].tier[0]!===''} */}
                    <img width='100' height='100' src={flexRank[0].length!==0 ? 
                        require(`../img/ranked-emblems/Emblem_${flexRank[0].tier[0]}${flexRank[0].tier.replace(flexRank[0].tier[0],'').toLowerCase()}.png`) : null} ></img>
                </div>
            :null}
        </div>  
        );
}

export default PlayerRank;