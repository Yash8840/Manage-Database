import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const NavBar = () =>  { 
    return( 
        <nav>
            <ul>
                <li>
                    <NavLink to ="/"> Acasa </NavLink>
                </li>
                <li>
                    <NavLink to = "/cities"> Orase </NavLink>
                </li>
                <li>
                    <NavLink to = "/places"> Atractii </NavLink>
                </li>
                <li>
                    <NavLink to = "/places/create">Creeaza Atractie</NavLink> 
                </li>
                <li>
                    <NavLink to = "/cities/create"> Creeaza Oras </NavLink>
                </li>
            </ul>
        </nav>
    )
}; 

export default NavBar; 