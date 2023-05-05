import { useState, useEffect } from "react";

const useFetch = (link) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(link);
      const dataSet = await response.json();
      setData(dataSet);
    };

    fetchData();
  }, [link]);

  return [data, setData];
};

export default useFetch;
