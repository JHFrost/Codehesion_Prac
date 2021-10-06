import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Menu = ({menudata, isEmpty}) => {
    const dynamicCards = [];
        
        return (
            <div className="wrapper">
                <div>
                    {isEmpty? menudata.map((element, index)=>{
                    return(  <div key={element.id} className="cardDiv"  style={{backgroundColor: element.colour_1, color: element.colour_2}}>
                        <h1>{element.name}</h1>
                        <h4>{element.description}</h4>
                        <img src={element.icon_1_url} style={{width: element.icon_width, height: element.icon_height}}></img>
                    </div>)
                    }) : <Link to="/login" id="redirectToLogin">You have to login, click here to go to the login page.</Link>}
                </div>
            </div>
        )
}

export default Menu
