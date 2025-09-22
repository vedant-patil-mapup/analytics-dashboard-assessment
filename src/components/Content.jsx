import React, {useState, useEffect} from 'react'
import TopManufacturer from '../charts/TopManufacturer'


const Content = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/ev-data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  return (
   <>
   <TopManufacturer data={data.make}/>
   </>
  )
}

export default Content