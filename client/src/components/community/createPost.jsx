import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { storage,db } from "../../firebase-config";
import {  ref ,uploadBytes  } from "firebase/storage";
import { addDoc, collection} from "@firebase/firestore";
import {v4} from "uuid"
import ReactLoading from 'react-loading';


const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement(document.getElementById('root'));

const CreatePost=(props)=>{
    const [titleText,setTitleText]=React.useState();
    const [contentText,setContentText]=React.useState();
    const video_ref=React.useRef(null)
    const [videoFile,setVideoFile]=React.useState(null)
    const [isLoadingSubmit,setIsLoadingSubmit]=React.useState(false);
    
    // console.log(props.currentUser.uid)
    const handleVideoChange=(event)=>{
        const file = event.target.files[0];
        setVideoFile(file);
    }
    const handleStoringToFirestore=async(video_url=null)=>{
        try{
            await addDoc(collection(db,"posts"),{
                // postCreater:props.currentUserName,
                timeStamp:Date.now(),
                uid:props.currentUser.uid,
                catagory:"technical",
                title:titleText,
                content:contentText,
                videoURL:video_url,
            })
        }catch(e){
            console.log(e)
        }
    }
    const handleVideoSummit=(event)=>{
        setIsLoadingSubmit(true)
        event.preventDefault()
        console.log('title:'+titleText);
        console.log("text:" +contentText)
        const videoId=v4();
        if(videoFile!==null){
            const uploadedVideo=ref(storage,`video/${videoId}`);
            handleStoringToFirestore(`video/${videoId}`)
            uploadBytes(uploadedVideo, videoFile).then((snapshot) => {
                console.log(snapshot)
                console.log('Uploaded a blob or file!');
            }).finally(()=>{
                props.refreshPage()
                props.closeModal()
                setIsLoadingSubmit(false);
            });
        }else{
            handleStoringToFirestore().finally(()=>{
                props.refreshPage()
                
                props.closeModal()
                setIsLoadingSubmit(false);
            })
        }
        

        

        // window.location.reload();
    }
    return(
        <div>
            <Modal
                isOpen={props.isPostCreatorOpen}
                style={customStyles}
                contentLabel="Post"
            >
                <h1>Post</h1>
                <div style={{width:'500px',height:'400px'}}>
                    <form onSubmit={handleVideoSummit}>
                        <label >
                            Title <input type="text" onChange={(event)=>setTitleText(event.target.value)} />
                        </label>
                        <label >
                            text <textarea  name="" id="" cols="30" rows="10"  onChange={(event)=>setContentText(event.target.value)}></textarea>
                        </label>

                        <input
                            title="video"
                            ref={video_ref}
                            // className="VideoInput_input"
                            type="file"
                            onChange={handleVideoChange}
                            accept=".mov,.mp4"
                        />
                        {isLoadingSubmit? <ReactLoading  type='spin' width='50px' height='50px' color='#43CDF0'  />
                        :<button type="submit">submit</button>}
                        
                    </form>
                    <button type="button" onClick={()=>props.closeModal()}>close </button>
                    {videoFile&&(
                        <video
                            style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                            playsInline
                            loop
                            muted
                            controls
                            alt="All the devices"
                            src={URL.createObjectURL(videoFile)}
                            ref={video_ref}
                        />
                    )}
                </div>
                
                
            </Modal>    
        </div>
    )
}

export default CreatePost;