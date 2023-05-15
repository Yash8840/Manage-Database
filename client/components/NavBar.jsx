import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const NavBar = () =>  { 
    return( 
        <nav className="navbar">
            <ul className="navbar-ul">
                <h1> Creeaza </h1>
                <li className="navbar-element">
                    <NavLink to ="/"> Acasa </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/cities"> Orase </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/places"> Atractii </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/roads"> Trasee </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/events"> Evenimente </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/places/create">Creeaza Atractie</NavLink> 
                </li>
                <li className="navbar-element">
                    <NavLink to = "/cities/create"> Creeaza Oras </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/roads/create"> Creeaza Traseu </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to = "/events/create"> Creeaza Eveniment </NavLink>
                </li>
            </ul>
        </nav>
    )
}; 

export default NavBar; 