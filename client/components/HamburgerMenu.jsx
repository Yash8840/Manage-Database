import { NavLink } from "react-router-dom";

function HamburgerMenu({isOpen}){
    return(
            <div className="hamburgerMenuList">
                    <NavLink className="navbar-element navbar-burgerLink" to = "/places/create">Creeaza Atractie</NavLink> 
                    <NavLink className="navbar-element navbar-burgerLink" to = "/cities/create"> Creeaza Oras </NavLink>    
                    <NavLink className="navbar-element navbar-burgerLink" to = "/roads/create"> Creeaza Traseu </NavLink>          
                    <NavLink className="navbar-element navbar-burgerLink" to = "/events/create"> Creeaza Eveniment </NavLink>          
            <style>{`
            .hamburgerMenuList{
                display:${isOpen ? `flex ` :`none`};
            }
            
           ${isOpen ?
            `.hamburgerMenu-btn{
                 background-color: #98C1D9;
                 border-radius: 14p
                }` 
                    : ``
            }
            `}
            </style>
            </div>  
    )
}
export default HamburgerMenu;
