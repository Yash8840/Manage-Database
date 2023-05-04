import React, { useEffect, useState } from "react";

const HomePage = () => { 
    const [data, setData] = useState( {} ); 

    useEffect( () => { 
        let mounted = true;
        (async () => {
          const res = await fetch(`http://localhost:3000/api/cities`, { 
            headers: { 'Content-Type': undefined } , 
          });
            if (mounted) {
              const data = await res.json();
              setData(data);
            }
        })()

        console.log(data)
    
        // Clean up function of unmounted
        return () => mounted = false;
    }, []); 
    

    return( 
        <section>
            <p>Salut</p>
        </section>
    )
}; 

export default HomePage