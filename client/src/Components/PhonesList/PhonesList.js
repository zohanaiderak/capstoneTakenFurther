import React from 'react';
import './PhonesList.scss';

const PhoneList =(props) =>{
    return(
        <>
            <img className="phone__pic" src={props.images} alt="Phone"></img>
            <h3 className="phone__name">{props.name}</h3>
        </>
    )
}

export default PhoneList;