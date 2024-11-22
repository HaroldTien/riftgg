import { layouts } from "chart.js";


async function fetchLeagueOfLegendsVersions() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // This is the array of version strings
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Or handle the error as you see fit
    }
}
const leatestVersion='14.2.1'

const Urls={
    getRealmRouter:(region)=>{
        switch(region){
            case "TW2":
                return regions.RegionalRoutingValues['ASIA'];
                break;
            case "OC1":
                return regions.RegionalRoutingValues['OCE'];
                break;
        };
    },
    getRegionRouter:(region)=>regions.PlatformRoutingValues[region],
    champAvatar:(champ,version)=>{
        console.log(version)
        return `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`
    },
    APIcountryTransfer:{
        'TW':'TW2',
        "HK":"TW2",
        'NZ':'OC1',
        "AU":"OC1",
        "US":"NA1",
    },
    regionFlagsTransfer:{
        "TW2":'tw',
        "OC1":'nz',
        "NA1":'us',
    },
    regionCode_region_transfer:{
        'TW2':'TW',
        'OC1':'OCE',
        "NA1":'NA',
    },
    get_summonerSpell_url:(spell_code)=>{
        const code_to_fileName={
            21:'summonerbarrier.png',
            1:'summoner_boost.png',
            2202:'summoner_flash.png',
            2201:'icon_summonerspell_flee.2v2_mode_fighters.png',
            14:'summonerignite.png',
            3:'summoner_exhaust.png',
            4:'summoner_flash.png',
            6:'summoner_haste.png',
            7:'summoner_heal.png',
            13:'summonermana.png',
            30:'benevolence_of_king_poro_icon.png',
            31:'trailblazer_poro_icon.png',
            11:'summoner_smite.png',
            39:'summoner_mark.png',
            32:'summoner_mark.png',
            12:'summoner_teleport.png',
            54:'summoner_empty.png',
            55:'summoner_emptysmite.png',
        }
        const url=`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${code_to_fileName[spell_code]}`
        return url

    },
    summoner_profile_icon_url:`http://ddragon.leagueoflegends.com/cdn/${leatestVersion}/img/profileicon/`,
    getItems_icon_rul:(item_code,version)=>{
        return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item_code}.png`
    },


}

const regions={
    "RegionalRoutingValues":{
        "AMERICAS":"americas.api.riotgames.com",
        "ASIA":"asia.api.riotgames.com",
        "EUROPE":"europe.api.riotgames.com",
        "SEA":"sea.api.riotgames.com"
    },
    "PlatformRoutingValues":{
        "BR1":"br1.api.riotgames.com",
        "EUN1":"eun1.api.riotgames.com",
        "EUW1":	"euw1.api.riotgames.com",
        "JP1"	:"jp1.api.riotgames.com",
        "KR"	:"kr.api.riotgames.com",
        "LA1"	:"la1.api.riotgames.com",
        "LA2"	:"la2.api.riotgames.com",
        "NA1"	:"na1.api.riotgames.com",
        "OC1"	:"oc1.api.riotgames.com",
        "TR1"	:"tr1.api.riotgames.com",
        "RU"	:"ru.api.riotgames.com",
        "PH2"	:"ph2.api.riotgames.com",
        "SG2"	:"sg2.api.riotgames.com",
        "TH2"	:"th2.api.riotgames.com",
        "TW2"	:"tw2.api.riotgames.com",
        "VN2"	:"vn2.api.riotgames.com"
    }
}



export default Urls;