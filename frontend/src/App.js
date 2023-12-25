import React, { useEffect, useState } from 'react';

function YourComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/logs');
      const jsonData = await response.json();
      setData(jsonData);
      console.log('Updated State:', jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('Current State:', data);

  return (
    <div>
      {data !== null ? (
        Array.isArray(data.logs) ? (
          // Render your array of data here
          data.logs.map(item => (
            <div key={item.id}>
              <h4>{item.commit}</h4>
              <h4>{item.level}</h4>
              <h4>{item.message}</h4>
            </div>
          ))
        ) : (
          // Render single object
          <div>
            <h4>{data.logs.commit}</h4>
            <h4>{data.logs.level}</h4>
            <h4>{data.logs.message}</h4>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default YourComponent;
