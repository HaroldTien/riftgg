import React from "react";
import NavBar from "../../components/NavBar.jsx";
import Post from "../../components/community/post.jsx";
import CommunityNavBar from "../../components/community/communityNavBar.jsx"
import "../../css/community/community_home.css"
import Login from "../../components/community/login.jsx"
import Register from "../../components/community/Register.jsx"


const Community_home=()=>{
    // const 

    return(
        <React.Fragment>
            <NavBar />
            <CommunityNavBar/>
            <h1>Home</h1>
            
            <Login />

            <Register />
            
        </React.Fragment>
    )
}

export default Community_home;