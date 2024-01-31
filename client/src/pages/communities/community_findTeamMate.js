import React from "react";
import NavBar from "../../components/NavBar.jsx";
import Post from "../../components/community/post.jsx";
import CommunityNavBar from "../../components/community/communityNavBar.jsx"
import "../../css/community/community_home.css"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase-config.js'

const Community_findTeamMate=()=>{
    const [loginState,setLoginState]=React.useState()
    const monitorAuthState=async()=>{
        onAuthStateChanged(auth,(user)=>{
            console.log(user)
            if(user!==null) setLoginState(1)
            else setLoginState(0)
        })
    }
    React.useEffect(()=>{
        monitorAuthState()
    },[])
    return(
        <React.Fragment>
            <NavBar />
            <CommunityNavBar/>
            <h1>find team mate</h1>
            <div className="posts-container">
                <Post />
            </div>
        </React.Fragment>
    )
}

export default Community_findTeamMate;