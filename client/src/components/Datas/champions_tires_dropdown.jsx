import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from "react-i18next";



const Champions_tires_dropdown=(props)=>{
    const {t}=useTranslation();
    const [tier,setTier]=React.useState('CHALLENGER');
    React.useEffect(()=>{
        props.get_teirs_from_dropdown(tier)
    },[])
    return(
        <Dropdown onSelect={(e) => {
                setTier(e)
                props.get_teirs_from_dropdown(e)
            }} >
            <Dropdown.Toggle variant="success" id="tiers-selector" >
            {tier===' '?t('Tier'):t(tier)}
            </Dropdown.Toggle>
            
            <Dropdown.Menu id='tiers-menu'  >
            <Dropdown.Item eventKey='CHALLENGER'>{t('CHALLENGER')}</Dropdown.Item>
            <Dropdown.Item eventKey='GRANDMASTER'>{t('GRANDMASTER')}</Dropdown.Item>
            <Dropdown.Item eventKey='MASTER'>{t('MASTER')}</Dropdown.Item>
    
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Champions_tires_dropdown;



