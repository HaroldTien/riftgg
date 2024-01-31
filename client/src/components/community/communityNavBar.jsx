import React, { useEffect, useState } from "react";
import "../../css/community/community-nav.css"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { signOut,onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase-config.js'
import { Label } from "recharts";


const CommunityNavBar=(props)=>{


    const {t}=useTranslation()
    const [loginState,setLoginState]=useState(props.loginState)
    useEffect(()=>{
        setLoginState(props.loginState)
    },[props.loginState])
    console.log(loginState)
    // console.log(props.loginState)
    return(
        <div className="community-nav">
            <ul>
                <li >
                    <Link to='/community/technical' className="no-underlink-link">{t('Technical')}</Link>
                </li>
                <li >
                    <Link to='/community/findTeamMate' className="no-underlink-link" >{t('LookingForTeamate')}</Link>
                    
                </li>
                <li >
                    <Link to='/community/crappyteammates' className="no-underlink-link" >{t('crappyTeammates')}</Link>
                    
                </li>

                {!loginState?
                    <>
                        <li >
                            <Link to='/community/signup' className="signin-signup no-underlink-link">sign up</Link>
                        </li>
                        <li  >
                            <Link to='/community/signin' className="signin-signup no-underlink-link" >sign in</Link>
                        </li>
                    </>

                    :
                    <li onClick={()=>signOut(auth)}>sign out</li>    
                } 
                {loginState?
                    <p className="login-state" style={{color:"green"}} >loged in<br></br>{props.currentUserName}</p>             
                    :<p className="login-state" style={{color:"red"}}>loged out</p>
                }      
            </ul>
        </div>
    )
}
export default CommunityNavBar;