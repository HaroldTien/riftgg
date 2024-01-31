import React,{useMemo,useEffect,useState} from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import '../../css/Datas/Challenger_champion_winRate_table.css'
import Champions_tires_dropdown from './champions_tires_dropdown.jsx'
import Champions_orderBy_dorpdown from './champions_orderBy_dorpdown.jsx'
import Urls from "../../urls.js";
import { useTranslation } from "react-i18next";
import LoadingAnimation from "../../css/LoadingAnimation.css"


const Challenger_champion_winRate_table=()=>{
    const [champions,setChampions]=useState([]);
    const [tiers,setTiers]=useState();
    const [isLoading,setIsloading]=useState(false);
    const [orderBy,setOrderBy]=useState();
    const {t}=useTranslation();
    
    const get_challenger_Champions_from_database=async()=>{
        const champions_ref=collection(db,"champions_challenger")
        try{
            const data=await getDocs(champions_ref)
            console.log(data)
            setChampions(data.docs.map((doc)=>({...doc.data()})))
        }catch(e){
            console.log(e)
        }
    }
    const get_grandmaster_Champions_from_database=async()=>{
        
        const champions_ref=collection(db,"champions_grandmaster")
        try{
            const data=await getDocs(champions_ref)
            console.log(data)
            setChampions(data.docs.map((doc)=>({...doc.data()})))
        }catch(e){
            console.log(e)
        }
    }
    const get_master_Champions_from_database=async()=>{
        
        const champions_ref=collection(db,"champions_master")
        try{
            const data=await getDocs(champions_ref)
            console.log(data)
            setChampions(data.docs.map((doc)=>({...doc.data()})))
        }catch(e){
            console.log(e)
        }
    }
    const get_teirs_from_dropdown=(cb)=>{
        const tier = cb;
        console.log(tier)
        setTiers(tier);
    }

    const get_orderBy_from_drowdown=(cb)=>{
        console.log(cb)
        setOrderBy(cb)   
    }

    useEffect(()=>{
        switch(tiers){
            case 'CHALLENGER':
                get_challenger_Champions_from_database();        
                break;
            case 'GRANDMASTER':
                get_grandmaster_Champions_from_database();
                break;
            case 'MASTER':
                get_master_Champions_from_database();
                break;
        }   
    },[tiers])

    const lanes={
        0:'top',
        1:'jungle',
        2:'middle',
        3:'bottom',
        4:'utility',
    }

    return(<>
            <Champions_tires_dropdown get_teirs_from_dropdown={get_teirs_from_dropdown}/>
            <Champions_orderBy_dorpdown get_orderBy_from_drowdown={get_orderBy_from_drowdown} />
            <Table striped bordered hover variant="dark" className="game-table">
                <tbody>
                    <tr>
                        <td>rank</td>
                        <td>Champions</td>
                        <td>Positions</td>
                        
                        <td>{t('win_rate')}</td>
                        <td>{t('pick_rate')}</td>
                    </tr>
                    {            
                        champions.sort(orderBy=='win_rate'?(b,a)=>a.win_rate-b.win_rate:(b,a)=>a.pick_rate-b.pick_rate).map((champion,index)=>{
                            return(
                                <tr key={champion.id}>
                                    <td>{index+1}</td>
                                    <td>
                                        <img width={40} height={40} id="champions_img" src={Urls.champAvatar(champion.championName)} alt={champion.championName} />
                                        {champion.championName} 
                                    </td>
                                    <td><img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-${lanes[champion.lane_code[0]]}.svg`} alt="" /></td>
                                    
                                    
                                    <td className="WinRate">{(champion.win_rate*100).toFixed(2)}%</td>
                                    <td className="pickRate">{(champion.pick_rate*100).toFixed(2)}%</td>
                                </tr>
                            )
                        })  
                    }
                </tbody>
            </Table>
        </>

    )
}
export default Challenger_champion_winRate_table;
