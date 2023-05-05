import React from "react";
import HomePage from "../pages/Home";
import Places from "../pages/Places";
import Cities from "../pages/Cities"; 
import NavBar from "../components/NavBar";
import PlaceManage from "../pages/PlaceManage";
import CityManage from  "../pages/CityManage"; 
import { Routes, Route } from "react-router-dom"; 

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
      </Routes>
    </section>
  )
}; 

export default App; 