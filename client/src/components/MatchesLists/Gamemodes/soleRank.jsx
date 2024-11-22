import React,{useState, version} from "react";
import Urls from "../../../urls";
import '../../../css/soleRank.css';
import { useTranslation } from "react-i18next";
import runes from '../../../runesReforged.json';


const SoleRank=(props)=>{
    const [showParticipants,setShowParticipants]=useState(false);
    const {t}=useTranslation();

    const unicodeToChar=(text)=> {
        return text.replace(/\\u[\dA-F]{4}/gi, 
               function (match) {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
               });
    }
    console.log(props)
    const getSummonerMatchData=()=>{
        const summoners_arr=[...props.match.participants];
        // console.log(summoners_arr)
        for(let i=0;i<summoners_arr.length;i++){
            if(unicodeToChar(summoners_arr[i].summonerId)===props.summonerProfile.id){
                return summoners_arr[i];
            }
        }
    }
    const SummonerMatchData=getSummonerMatchData()
    const getDateFromUnixTime=()=>{
        const date=new Date(props.match.gameStartTimestamp);
        let hours=date.getHours().toString();   
        let minutes=date.getMinutes().toString();
        let seconds=date.getSeconds().toString();
        return `${date.toLocaleDateString('zh-TW')} ${hours}:${minutes}:${seconds}`;
    }

    const getParticipantsItems=(participant)=>{
        return [SummonerMatchData.items[0],SummonerMatchData.items[1],SummonerMatchData.items[2],SummonerMatchData.items[3],SummonerMatchData.items[4],SummonerMatchData.items[5]]
    }
    console.log(props.match.participants[0].win)
    const teammates = props.match.participants
    .filter(participant => participant.win === SummonerMatchData.win)
    .map(participant => (
        <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}`}>
            <div className='participant teammate' >
                <img width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />
                <p >{participant.summonerName}</p>
                <div className="kda"><p>{participant.kills}/{participant.deaths}/{participant.assists}</p></div>
                <div className="items">
                        {getParticipantsItems(participant).filter(item_code=>item_code!==0).map((item,index)=><img key={index} src={Urls.getItems_icon_rul(item,props.match.version)}></img>)}
                </div>
            </div>
        </a>
    ));

    const enemies =props.match.participants
        .filter(participant => participant.win !== SummonerMatchData.win)
        .map(participant => (
            <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}&summonerId=${participant.summonerId}`}>
            <div className='participant enemy'>
                <img className="champion-icon" width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />                                
                <p >{participant.summonerName}</p>
                <div className="kda"><p>{participant.kills}/{participant.deaths}/{participant.assists}</p></div>
                <div className="items">
                    {getParticipantsItems(participant).filter(item_code=>item_code!==0).map((item,index)=><img key={index} src={Urls.getItems_icon_rul(item,props.match.version)}></img>)}
                </div>
            </div>
            </a>
        ));

    const items_arr=[SummonerMatchData.items[0],SummonerMatchData.items[1],SummonerMatchData.items[2],SummonerMatchData.items[3],SummonerMatchData.items[4],SummonerMatchData.items[5]]
    
    const handleChangeShowParticipants=()=>{
        if(showParticipants===true)setShowParticipants(false);
        else setShowParticipants(true);
    }
    const get_runesIcons_url=(rune_id)=>{
        for(let i=0;i<runes.length;i++){
            if(runes[i].id===rune_id) return runes[i].icon;
            for(let j=0;j<runes[i].slots.length;j++){
                for(let k=0;k<runes[i].slots[j].runes.length;k++) if(runes[i].slots[j].runes[k].id===rune_id) return runes[i].slots[j].runes[k].icon;
            }
        }
    }
    return(
        <div className='gamecontent' onClick={handleChangeShowParticipants}>
            <div className="game-mode-kda-teamposition">
            <p className="kda">{`${SummonerMatchData.kills} /  ${SummonerMatchData.deaths} / ${SummonerMatchData.assists}`} </p>
                <p className="game-mode">{t(props.match.gameMode)}</p>
                <img className="teamposition" src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-${SummonerMatchData.teamPosition.toLowerCase()}.svg`}></img> 
            </div>
                        
            <div className="champion-icon-spells-runes-items">
                <div className="champion-icon-spells-runes">
                    <img className="champion-icon"  style={{ border: `2px solid ${SummonerMatchData.win===true?'green':'#ff0000'}`}}  width={60} height={60} src={Urls.champAvatar(SummonerMatchData.championName,props.match.version)}></img>
                    <div className="spells">
                        <img className="spell" src={Urls.get_summonerSpell_url(SummonerMatchData.summoner1Id)}></img>
                        <img className="spell" src={Urls.get_summonerSpell_url(SummonerMatchData.summoner2Id)}></img>
                    </div>
                    <div className="runes">
                        <img className="prime-rune" src={`https://ddragon.canisback.com/img/${get_runesIcons_url(SummonerMatchData.primeRune)}`}></img>
                        <img className="sub-rune" src={`https://ddragon.canisback.com/img/${get_runesIcons_url(SummonerMatchData.secondRune)}`}></img>
                    </div>
                </div>
                <div  className="items-container">
                    {items_arr.filter(item=>item!==0).map((item_code,index)=>{
                        return(<img key={index} className='item'  src={Urls.getItems_icon_rul(item_code,props.match.version)}></img>)
                    })} 
                 </div>
            </div>
            
            <div className="game-times">
                <p>{Math.floor(props.match.gameDuration/60)} {t('minutes')} {props.match.gameDuration%60} {t('seconds')}</p>
                <p>{getDateFromUnixTime()}</p>
            </div>

            {showParticipants?
                <div className='participants'>
                    <div className='teammates'>{teammates}</div>
                    <div className='enemies'>{enemies}</div>
                </div>
            :null}
        </div>  
    );
}

export default SoleRank;