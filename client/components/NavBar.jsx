import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import burgerMenuPicture  from "../css/burgerMenu.png"

const NavBar = () =>  { 
    const [hamburgerOpen,setHamburger]= useState(false);
    const togHamburger = ()=>{
         setHamburger(!hamburgerOpen)
         console.log(hamburgerOpen)
    }
  
    useEffect(() => {
      }, [hamburgerOpen]);
    return( 
        <>
        <nav className="navbar">
            <ul className="navbar-ul">
                <h1>Creaza CV</h1>
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
                
                 <div className="hamburgerMenu-btn" onClick={togHamburger}>
                    <img src={burgerMenuPicture}  alt="menuIcon"  ></img>
                <HamburgerMenu isOpen ={hamburgerOpen}/>      
            </div>
 
            </ul>
        </nav>
        </>
    )
}; 

export default NavBar; 