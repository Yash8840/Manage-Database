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
import Roads from "../pages/Roads";
import RoadManage from "../pages/RoadManage";
import RoadPage from "../pages/RoadPage";
import EventPage from "../pages/EventPage";
import EventManage from "../pages/EventManage";
import Events from "../pages/Events";
import "../css/main.css"; 
import  "../css/formMain.css"; 

const App = () => { 
  return( 
    <section className="app"> 
      <NavBar/> 
      <Routes>
        {/* List Routes */}
        <Route path = "/" element = { <HomePage />} />
        <Route path = "/places" element = { <Places /> } />
        <Route path = "/cities" element = { <Cities />} />
        <Route path = "/roads" element = { <Roads /> } /> 
        <Route path = "/events" element = { <Events /> } /> 

        {/* Manage Routes*/}
        <Route path = "/places/create" element = { <PlaceManage /> }/>
        <Route path = "/cities/create" element = { <CityManage /> } />  
        <Route path = "/roads/create" element = { <RoadManage /> } /> 
        <Route path = "/events/create" element = { <EventManage /> } /> 

        {/* Detail Routes*/}
        <Route path = "/places/:id" element = { <PlacePage />} /> 
        <Route path = "/cities/:id" element = { <CityPage /> } /> 
        <Route path = "/places/:id/update" element = { <UpdatePlace /> } /> 
        <Route path = "/cities/:id/update" element = { <UpdateCity /> } /> 
        <Route path = "/roads/:id" element = { <RoadPage /> } /> 
        <Route path = "/events/:id" element =  { <EventPage /> } /> 
      </Routes>
    </section>
  )
}; 

export default App; 