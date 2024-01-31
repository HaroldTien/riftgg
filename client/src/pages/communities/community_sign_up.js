import React from "react";
import NavBar from "../../components/NavBar.jsx";
import Post from "../../components/community/post.jsx";
import CommunityNavBar from "../../components/community/communityNavBar.jsx"
import "../../css/community/community_home.css"
import Register from "../../components/community/Register.jsx"


const Community_sign_up=()=>{
    // const 

    return(
        <React.Fragment>
            <NavBar />
            <CommunityNavBar/>
            <h1>sign up</h1>

            <Register />
            
        </React.Fragment>
    )
}

export default Community_sign_up;