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
            <div className="navbar-ul">
                <h1>Creaza CV</h1>
                <NavLink className="navbar-element" to ="/"> Acasa </NavLink>
                <NavLink className="navbar-element" to = "/cities"> Orase </NavLink>
                <NavLink className="navbar-element" to = "/places"> Atractii </NavLink>
                <NavLink  className="navbar-element" to = "/roads"> Trasee </NavLink>
                <NavLink className="navbar-element" to = "/events"> Evenimente </NavLink>      
                 
            <div className="hamburgerMenu-btn" onClick={togHamburger}>
                    <img src={burgerMenuPicture}  alt="menuIcon"  ></img>
                <HamburgerMenu isOpen ={hamburgerOpen}/>      
            </div>
 
            </div>
        </nav>
        </>
    )
}; 

export default NavBar; 