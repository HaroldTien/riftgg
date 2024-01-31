import React, { useEffect } from "react";
import NavBar from "../../components/NavBar.jsx";
import CommunityNavBar from "../../components/community/communityNavBar.jsx"
import "../../css/community/community_home.css"
import Login from "../../components/community/login.jsx"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase-config.js"
// import AfterLogin from "../../components/community/AfterLogin.jsx";



const Community_sign_in=()=>{
    // const 
    const [loginState,setLoginState]=React.useState();
    const [userNameShownOnAfterLogin,setUserNameShownOnAfterLogin]=React.useState();

    const monitorAuthState=async()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){ //user is signed in 
                setLoginState(1);
                
            }else{//user is signed out
                setLoginState(0)
            }
        })
    }
    useEffect(()=>{
        monitorAuthState();
    },[loginState])
    return(
        <React.Fragment>
            <NavBar />
            <CommunityNavBar  loginState={loginState} />
            <h1>sign in </h1>

            <Login setLoginState={setLoginState} setUserNameShownOnAfterLogin={setUserNameShownOnAfterLogin} />
            
        </React.Fragment>
    )
}

export default Community_sign_in;