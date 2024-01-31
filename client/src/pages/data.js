import React,{useEffect,useState} from "react";
import NavBar from "../components/NavBar.jsx";
import Challenger_champion_winRate_table from "../components/Datas/winRate_table.jsx"


const Data=(props)=>{

    return(
        <React.Fragment>
            <NavBar />
            <div className="champions-data">                 
                < Challenger_champion_winRate_table />
            </div>
            
            {/* <h1>Developing</h1> */}
        </React.Fragment>
    )
}

export default Data;

// ,win rate:{champ.win_rate}