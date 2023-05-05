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
import main from "../css/main.css?inline"; 

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
        <Route path = "/places/:id/update" element = { <PlaceManage /> } /> 
        <Route path = "/cities/:id/update" element = { <CityManage /> } /> 
      </Routes>
    </section>
  )
}; 

export default App; 