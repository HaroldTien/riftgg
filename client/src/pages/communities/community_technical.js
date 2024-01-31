import React, { useEffect } from "react";
import NavBar from "../../components/NavBar.jsx";
import Post from "../../components/community/post.jsx";
import CommunityNavBar from "../../components/community/communityNavBar.jsx"
import "../../css/community/community_home.css"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase-config.js'
import { db } from "../../firebase-config.js";
import CreatePost from "../../components/community/createPost.jsx" 
import PostModal from "../../components/community/postModal.jsx";
import Button from 'react-bootstrap/Button';
import { addDoc, collection, query, where, getDocs } from "@firebase/firestore";

const Community_technical=()=>{
    // const [loginState,setLoginState]=React.useState()
    // const [userName,setUserName]=React.useState()
    const [isPostCreatorOpen,setIsPostCreatorOpen]=React.useState(false)
    const [isPostModalOpen,setIsPostModalOpen]=React.useState(false);
    const [posts_arr,setPosts_arr]=React.useState([]);
    const [ReadingPost,setReadingPost]=React.useState(null);
    const [loginState,setLoginState]=React.useState();
    const [currentUser,setCurrenUser]=React.useState(null);
    
    const monitorAuthState=async()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){ //user is signed in 
                setLoginState(1);
                setCurrenUser(user)
                
            }else{//user is signed out
                setLoginState(0)
            }
        })
    }
    const refreshPage=()=>window.location.reload();
    const closeCreatePostModal=()=>{ // pass to CreatePost component
        setIsPostCreatorOpen(false)
        
    }
    const closePostModal=()=>{
        setIsPostModalOpen(false)
        refreshPage()
    }

    
    console.log(loginState)
    const loadPosts=async()=>{
        let postsList=[];
        const q = query(collection(db, "posts"), where("catagory", "==", "technical"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        postsList.push({
            "data":doc.data(),
            "id":doc.id
        })
        // console.log(doc.id, " => ", doc.data());
        });
        setPosts_arr(postsList)
    }
    useEffect(()=>{
        loadPosts();
        monitorAuthState();
    },[])
    // console.log(currentUser)
    if(isPostModalOpen===true){
        return(<PostModal 
            post={posts_arr.find(element=>element.id===ReadingPost)} 
            isPostModalOpen={isPostModalOpen} 
            setIsPostModalOpen={setIsPostModalOpen}
            currentUser={currentUser!==null?currentUser:null}
            closeModal={closePostModal}
            />)
    }
    return(
        <React.Fragment>
            <NavBar />
            <CommunityNavBar 
                currentUserName={currentUser!==null?currentUser.displayName:null}
                loginState={loginState}  
            />
            <Button 
                onClick={()=>{
                    if(loginState){
                        setIsPostCreatorOpen(true)
                    }else{
                        window.alert('pleast login before post')
                    }                    
                }}
            >
                <div style={{height:'100px',width:'200px'}}>
                    <p>Share some of your expert gaming techniques</p>
                </div>
            </Button>
            <CreatePost isPostCreatorOpen={isPostCreatorOpen} 
                        closeModal={closeCreatePostModal} 
                        loginState={loginState}
                        refreshPage={refreshPage}
                        currentUser={currentUser!==null?currentUser:null}
                        />
                        
            <div className="posts-container">
                {posts_arr.map((post)=>{
                    return(
                        <div key={post.id}>
                            <Post id={post.id} title={post.data.title} content={post.data.content} setReadingPost={setReadingPost} setIsPostModalOpen={setIsPostModalOpen} />
                        </div>
                    )
                })}

            </div> 
        </React.Fragment>
    )
}

export default Community_technical;