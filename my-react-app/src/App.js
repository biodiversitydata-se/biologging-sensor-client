
// http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/dataset/LU_trackingradar_Lundfixed_2006-13
import logo from './logo.svg';
import './App.css';

import axios from 'axios';


import React, { useEffect, useState } from 'react';

function App() {
  const [apiData, setApiData] = useState(null);
  const apiUrl = 'http://canmove-dev.ekol.lu.se:8080/sensorAPI/v1/dataset/LU_trackingradar_Lundfixed_2006-13';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch data from the API using Axios
        const response = await axios.get(apiUrl);
    
        // Axios automatically checks for a successful response (status code 200-299)
        // Parse the response data
        const data = response.data;
    
        // Set the fetched data in the component's state
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error('Error details:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetching Data Task#8</h1>
  
        {apiData ? (
          <div>
            <h2>Fetched Data</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </header>
    </div>
  );
  
}

export default App;











































// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// export default App;
