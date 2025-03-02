import '../css/home.css'
import homeImg from '../img/home/homeImg2.png'
import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from 'axios';
import Urls from '../urls';
import LoadingAnimation from '../components/LoadingAnimation';
import '../i18n.js'; // Import your i18n configuration
import { useTranslation } from 'react-i18next';

import Dropdown from 'react-bootstrap/Dropdown'; //react-bootstrap dropdown
import 'bootstrap/dist/css/bootstrap.min.css' //bootstrap
import "/node_modules/flag-icons/css/flag-icons.min.css";//for flags

const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

const languageRegionTransfer={
  "TW":1,
  "NZ":0,
  "AU":0,
  'US':0,
}

const Home = () => {
  const [summonerName, setsummonerName] = useState(' ');
  const [targetline,setTargetline] =useState('');
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading]=useState(true);
  const navigator = useNavigate();
  const regionRef=useRef(null);
  const {t,i18n}  =useTranslation();

  const RegionAPI_request = async () => {
    try {
      const IP = await axios.get('https://api.ipify.org/?format=json')
      const data = (await axios.get(`https://ipinfo.io/${IP.data.ip}?token=47505e156b4dbe`));
      const country = data.data.country;
      console.log("current region has been catche from API: " + country);
      setRegion(region => region = Urls.APIcountryTransfer[country]);
      setTargetline(targetline=>targetline=Urls.APIcountryTransfer[country])
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    setIsLoading(false);
  }

  const NavigationToSummonerProfile = (summonerName) => {
    navigator(`/summonerProfile?summonerName=${summonerName}&targetline=${targetline}&region=${region!==null?region:regionRef.current.value}`, { state: { language:i18n.language} });
  }

  const handleSummit=(e) => {
    if(summonerName===' '){
      navigator('/SearchError');
      console.log("error")
    }else{
      e.preventDefault();
      setRegion(prev=>prev=regionRef.current.value);
      NavigationToSummonerProfile(summonerName);
    }

  }
  useEffect(() => {
    RegionAPI_request();
    setTimeout(()=>{
      setIsLoading(false);
    },3000); 
  }, [])
  
  if(isLoading){
    return(
      <div className='laoding-container'>
        <h2 className='loading'>Loading Page . . . </h2>
        <LoadingAnimation />
      </div>)
  };
  console.log(targetline)
  return (
      <React.Fragment>
        <NavBar region={region}  />
        {/* <div className="background-page"> */}
        <img className="homeImg" src={homeImg} ></img>
          <div className="searcher-container">
            <form onSubmit={handleSummit}>
              <Dropdown onSelect={(e) => {
                    console.log(e)
                    setRegion(prev => prev = e);
                  }} 
                  ref={regionRef}>
                <Dropdown.Toggle variant="success" id="regions-selector" >
                  {Urls.regionCode_region_transfer[region]===undefined?
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472M3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                    </svg>
                  :<>{t(Urls.regionCode_region_transfer[region])}&nbsp;&nbsp;<span className={`fi fi-${Urls.regionFlagsTransfer[region]}`}></span></>
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu id='regions-menu'  >
                  <Dropdown.Item eventKey='OC1'>{t('OCE')}&nbsp;<span className="fi fi-nz "></span></Dropdown.Item>
                  <Dropdown.Item eventKey='TW2'>{t('TW')}&nbsp;&nbsp;<span className="fi fi-tw "></span></Dropdown.Item>
                  <Dropdown.Item eventKey='NA1'>{t('NA')}&nbsp;&nbsp;&nbsp;<span className="fi fi-us "></span></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              <input placeholder='Enter summoner name . . .' id="searchInput" type={'text'} onChange={(e) => setsummonerName((prev) => prev = e.target.value)} ></input>
              <input placeholder={`#${targetline}`} id="targetline" type={'text'} onChange={(e) => setTargetline(e.target.value || targetline)} ></input>
              <button id="searchButton" type="summit" >{t('Search')}</button>

            </form>
          </div>

        {/* </div> */}

        {/* <footer>
          <p>© 2023 Harold</p>
        </footer> */}
      </React.Fragment>

  );
}
export default Home;


