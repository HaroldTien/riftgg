
import homeImg from '../img/home/homeImg.png'
import Select from 'react-select';
import React,{useEffect, useState,useRef, useContext} from 'react';
import '../i18n.js'; // Import your i18n configuration
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    createBrowserRouter,
    RouterProvider,
    Link 
  } from "react-router-dom";
import '../css/nav.css'



const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      color:"black"
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  const imageStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
};

const languages=[
    {value:'en',label:<div><span className="fi fi-gb "> </span>&nbsp;English</div>},
    {value:'ch',label:<div><span className="fi fi-tw "> </span>&nbsp;Chinese</div>},
];



const NavBar=(props)=>{
    const {t,i18n}=useTranslation();
    const hanleLangeuageSelectChange=(selectedLanguage)=>{
        i18n.changeLanguage(selectedLanguage.value);
    };
    return(
        <nav className='nav'>
            <Link to="/" className='site-title'>
                RIFT.GG            
            </Link> 
            <ul>
                <li>
                    <Link to="/community/technical">
                        {t('Community')}
                    </Link>
                </li>
                <li>
                    <Link to="/data"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart" viewBox="0 0 16 16">
                                    <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                                    </svg>&nbsp;&nbsp;
                                {t('data')}
                    </Link>
                </li>
                <li>
                    <Select className='languages-selector'
                            styles={customStyles} 
                            options={languages}
                            defaultValue={languages.filter(option=>option.value===i18n.language)}
                            onChange={hanleLangeuageSelectChange}  
                            placeholder="Language"
                    />
                </li>

            </ul>
        </nav>
    );
}
export default NavBar;