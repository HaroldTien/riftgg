import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, deleteDoc,collection, query, where  } from "firebase/firestore";
import { storage,db } from "../../firebase-config";
import '../../css/community/postModal.css'
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
        borderRadius:'2rem',
        width: '50%',
        height: 'fit-content',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement(document.getElementById('root'));
  //video/16680b4e-0ad5-4e4a-bf29-b0f705344e3b.movba877314-dabf-462a-bc95-b693f964a942'
  //16680b4e-0ad5-4e4a-bf29-b0f705344e3b.mov1d5c0f52-ff78-4238-ab03-be912aaf6fc3
const PostModal=(props)=>{
    const [video_url,setVideo_url]=useState()
    const [deletingPostLoading,setDeletingPostLoading]=useState(false);

    console.log(props.post.data.videoURL)
    const loadingVideo = async () => {
        try {
            const videoPath = props.post.data.videoURL ;
            const url = await getDownloadURL(ref(storage, videoPath));
            setVideo_url(url)
            console.log(url);
        } catch (error) {
            console.error("Error loading video from Firebase Storage:", error.message);
        }
    };
    
    const handleDeletPost=async()=>{
        setDeletingPostLoading(true);
        const videoPath = props.post.data.videoURL 
        const video_ref= ref(storage,videoPath);
        try{
            await deleteDoc(doc(db, "posts", props.post.id));
            await deleteObject(video_ref)
        }catch(e){
            console.log(e)
        }finally{
            setDeletingPostLoading(false)
            props.closeModal()
        }
    }
    console.log(props)
    // console.log(props)
    useEffect(()=>{
        if(props.post.data.videoURL!==null)loadingVideo();
        
    },[])

    const postData=props.post.data;
    return(
        <div>
            <Modal
                isOpen={props.isPostModalOpen}
                style={customStyles}
                contentLabel="Post"
            >
                <div className="post-modal">
                    <h1 className="title">{postData.title}</h1>
                    <p className="text-content">{postData.content}</p>
                    {postData.videoURL!==null?
                        <video 
                            className="post-video" 
                            src={video_url}  
                            playsInline
                            loop
                            muted
                            controls
                            alt="All the devices"
                        ></video>
                    :null}
                    <button className="close-button" onClick={()=>{props.setIsPostModalOpen(false)}}>close</button>
                    {props.currentUser===null||props.currentUser.uid!==postData.uid?
                        null:!deletingPostLoading?<button onClick={handleDeletPost}>delet</button>:<ReactLoading type="spinningBubbles" height={'20px'} width={'20px'} />
                    }
                </div>

            
            </Modal>    
        </div>
    )
}

export default PostModal;