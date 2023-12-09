// Import any necessary modules
import { useEffect, useState } from 'react';
import { DefaultApi } from 'C:\UI React Lund\biologging-sensor-client\my-react-app\src'; // Adjust the path based on your project structure

// Create an instance of the API client
const api = new DefaultApi();

// Functional component example
const YourComponent: React.FC = () => {
  // State to hold data from the API
  const [apiData, setApiData] = useState([]);

  // useEffect to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API request using the generated client
        const response = await api.getAllDatasets();

        // Handle the response data
        setApiData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Render your component UI using the fetched data
  return (
    <div>
      <h1>Your React Component</h1>
      {/* Render your component UI using the apiData state */}
      {/* ... */}
    </div>
  );
};

export default YourComponent;
