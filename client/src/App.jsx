import React from "react";
import HomePage from "../pages/Home";
import Places from "../pages/Places";
import Cities from "../pages/Cities"; 
import NavBar from "../components/NavBar";
import PlaceManage from "../pages/PlaceManage";
import CityManage from  "../pages/CityManage"; 
import { Routes, Route } from "react-router-dom"; 
import PlacePage from "../pages/PlacePage";
import CityPage from "../pages/CityPage";
import UpdateCity from "../pages/UpdateCity";
import UpdatePlace from "../pages/UpdatePlace";
import "../css/main.css"; 

const App = () => { 
  return( 
    <section className="app"> 
      <NavBar/> 
      <Routes>
        <Route path = "/" element = { <HomePage />} />
        <Route path = "/places" element = { <Places /> } />
        <Route path = "/cities" element = { <Cities />} />
        {/* Manage Routes*/}
        <Route path = "/places/create" element = { <PlaceManage /> }/>
        <Route path = "/cities/create" element = { <CityManage /> } />  

        {/* Detail Routes*/}
        <Route path = "/places/:id" element = { <PlacePage />} /> 
        <Route path = "/cities/:id" element = { <CityPage /> } /> 
        <Route path = "/places/:id/update" element = { <UpdatePlace /> } /> 
        <Route path = "/cities/:id/update" element = { <UpdateCity /> } /> 
      </Routes>
    </section>
  )
}; 

export default App; 