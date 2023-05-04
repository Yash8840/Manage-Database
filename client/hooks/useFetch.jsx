import { useState, useEffect } from "react";

const useFetch = async (link) => {
    const res = await fetch(link);
    const dataSET = await res.json();
    return dataSET; 
}; 

export default useFetch; 

