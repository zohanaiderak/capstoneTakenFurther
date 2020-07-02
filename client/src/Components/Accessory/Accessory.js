import React from 'react';

const Accessory = (props) =>{
        return(
            <>
                <img className="phone__pic" src={props.image} alt="Phone"></img>
                <h3 className="phone__name">{props.name}</h3>
            </>
        )
}

export default Accessory;