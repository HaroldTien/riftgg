import React from "react";
import NavBar from "../components/NavBar";

function AiBP(props) {
    console.log(props);
    return ( 
        <React.Fragment>
            <NavBar />
            <div style={{justifyContent:"center"}}>
                developing
                <a href="/">home</a>
            </div>
        </React.Fragment>

     );
}

export default AiBP;