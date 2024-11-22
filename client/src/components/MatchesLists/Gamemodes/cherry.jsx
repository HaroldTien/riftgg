import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import Urls from "../../../urls";
import runes from '../../../runesReforged.json';
import '../../../css/cherry.css';


const Cherry=(props)=>{
    const [showParticipants,setShowParticipants]=useState(false);
    const {t}=useTranslation();

    const unicodeToChar=(text)=> {
        return text.replace(/\\u[\dA-F]{4}/gi, 
               function (match) {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
               });
    }
    
    const getSummonerMatchData=()=>{
        const summoners_arr=[...props.match.participants];
        for(let i=0;i<summoners_arr.length;i++){
            if(unicodeToChar(summoners_arr[i].summonerId)===props.summonerProfile.id){
                return summoners_arr[i];
            }
        }
    }
    const SummonerMatchData=getSummonerMatchData();

    const getDateFromUnixTime=()=>{
        const date=new Date(props.match.gameStartTimestamp);
        let hours=date.getHours().toString();   
        let minutes=date.getMinutes().toString();
        let seconds=date.getSeconds().toString();
        return `${date.toLocaleDateString('zh-TW')} ${hours}:${minutes}:${seconds}`;
    }

    const participants = props.match.participants.map((participant) => (
        <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}`}>
            <div className={`participant ${participant.win===true?'winner':''}`}>
                <img className="champion-icon" width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />
                <p>{participant.summonerName}</p>
                <div className="kda"><p>{participant.kills}/{participant.deaths}/{participant.assists}</p></div>
                <div className="items">
                    {participant.items.filter(item=>item!==0).map((item,index)=>(
                        <img key={index} src={Urls.getItems_icon_rul(item,props.match.version)} alt="item" />
                    ))}
                </div>
            </div>
        </a>
    ));

  
    const team_4 = props.match.participants
    .filter(participant => participant.subteamPlacement===4)
    .map(participant => (
        <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}`}>
            <div className='participant fourth'  >
                <img  width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />
                {participant.summonerName}
            </div>
        </a>
    ));
    console.log(SummonerMatchData)
    const items_arr=[SummonerMatchData.items[0],SummonerMatchData.items[1],SummonerMatchData.items[2],SummonerMatchData.items[3],SummonerMatchData.items[4],SummonerMatchData.items[5]]

    const handleChangeShowParticipants=()=>{
        if(showParticipants===true)setShowParticipants(false);
        else setShowParticipants(true);
    }


    return(
        <div className='gamecontent' onClick={handleChangeShowParticipants}>
            <div className="game-mode-kda-teamposition">
            <p className="kda">{`${SummonerMatchData.kills} /  ${SummonerMatchData.deaths} / ${SummonerMatchData.assists}`} </p>
                <p className="game-mode">{t(props.match.gameMode)}</p>
            </div>
                        
            <div className="champion-icon-spells-runes-items">
                <div className="champion-icon-spells-runes">
                    <img className="champion-icon"  style={{ border: `2px solid ${SummonerMatchData.win===true?'green':'#ff0000'}`}}  width={60} height={60} src={Urls.champAvatar(SummonerMatchData.championName,props.match.version)}></img>
                    <div className="spells">
                        <img className="spell" src={Urls.get_summonerSpell_url(SummonerMatchData.summoner1Id)}></img>
                        <img className="spell" src={Urls.get_summonerSpell_url(SummonerMatchData.summoner2Id)}></img>
                    </div>
                </div>

                <div  className="items-container">
                    {items_arr.filter(item=>item!==0).map((item,index)=>{
                        return(<img key={index} className='item'  src={Urls.getItems_icon_rul(item,props.match.version)}></img>)
                    })} 
                 </div>
            </div>
            
            <div className="game-times">
                <p>{Math.floor(props.match.gameDuration/60)} {t('minutes')} {props.match.gameDuration%60} {t('seconds')}</p>
                <p>{getDateFromUnixTime()}</p>
            </div>
            {showParticipants === true ? (
                <div className='participants'>
                    <div className='teammates'>
                        {props.match.participants
                            .filter(participant => participant.subteamPlacement <= 2)
                            .map((participant) => (
                                <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}`}>
                                    <div className='participant'>
                                        <img className="champion-icon" width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />
                                        <p>{participant.summonerName}</p>
                                        <div className="kda">{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                        <div className="items">
                                            {participant.items.filter(item=>item!==0).map((item,index)=>(
                                                <img key={index} src={Urls.getItems_icon_rul(item,props.match.version)} alt="item" />
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                    <div className='enemies'>
                        {props.match.participants
                            .filter(participant => participant.subteamPlacement > 2)
                            .map((participant) => (
                                <a key={participant.summonerId} href={`/summonerProfile?summonerName=${participant.summonerName}&region=${props.region}`}>
                                    <div className='participant'>
                                        <img className="champion-icon" width={20} height={20} src={Urls.champAvatar(participant.championName,props.match.version)} alt={participant.championName} />
                                        <p>{participant.summonerName}</p>
                                        <div className="kda">{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                        <div className="items">
                                            {participant.items.filter(item=>item!==0).map((item,index)=>(
                                                <img key={index} src={Urls.getItems_icon_rul(item,props.match.version)} alt="item" />
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            ) : null}

        </div>  
    );
}
export default Cherry;

