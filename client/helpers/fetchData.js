const fetchData = async (link) => { 
    const results = await fetch(link); 
    const res = await results.json(); 
    return res; 
}

export default fetchData