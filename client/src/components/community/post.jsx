import React, { useState } from "react";
import '../../css/community/post.css'


const Post = (props) =>{
    const [title,setTittle]=useState('defualt title')
    const hanlePostIsclicked=()=>{
        props.setIsPostModalOpen(true)
        props.setReadingPost(props.id)
    }
    return(
        <div key={props.id} className="post-container" onClick={hanlePostIsclicked}>
            <h1 id="title">{props.title}</h1> 
            <p >{props.content}</p>
            {/* <video
                style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                playsInline
                loop
                muted
                controls
                alt="All the devices"
                src={}
                ref={video_ref}
            /> */}
        </div>
    )
}

export default Post;