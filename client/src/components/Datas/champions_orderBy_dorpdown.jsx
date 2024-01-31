import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from "react-i18next";


const Champions_orderBy_dorpdown=(props)=>{
    const {t}=useTranslation();
    const [orderBy,setOrderBy]=React.useState("win_rate");
    React.useEffect(()=>{
        props.get_orderBy_from_drowdown(orderBy)
    },[])
    return(
        <Dropdown onSelect={(e) => {
            setOrderBy(e)
            props.get_orderBy_from_drowdown(e)
            }} >
            <Dropdown.Toggle variant="success" id="orderType-selector" >
            Order By {t(orderBy)}
            </Dropdown.Toggle>
            <Dropdown.Menu id='orderType-menu'  >
            <Dropdown.Item eventKey='win_rate'>Order by {t('win_rate')}</Dropdown.Item>
            <Dropdown.Item eventKey='pick_rate'>Order by {t('pick_rate')}</Dropdown.Item>
    
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Champions_orderBy_dorpdown;