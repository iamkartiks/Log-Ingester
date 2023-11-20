import React, { useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import './index.css'; // Import your CSS file

const socket = socketIOClient('http://127.0.0.1:3000');

const QueryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    parentResourceId: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Construct the API request URL based on the entered filters and search term
    const apiUrl = `/logs?${constructQueryParams()}`;

    // Make the API request
    axios.get(apiUrl)
      .then((response) => {
        setSearchResults(response.data.logs);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const constructQueryParams = () => {
    const queryParams = [];

    // Add non-empty filters to the query parameters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.push(`${key}=${encodeURIComponent(filters[key])}`);
      }
    });

    // Add the search term to the query parameters
    if (searchTerm) {
      queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
    }

    return queryParams.join('&');
  };

  return (
    <div className="query-container">
      <h1>Log Query Interface</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-container">
        <label>Level:</label>
        <input
          type="text"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        />
        {/* Add similar input fields for other filters (message, resourceId, timestamp, traceId, spanId, commit, parentResourceId) */}
      </div>

      <div className="results-container">
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((log, index) => (
            <li key={index}>
              <p>Level: {log.level}</p>
              <p>Message: {log.message}</p>
              {/* Display other log attributes */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueryPage;
