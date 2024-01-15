import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${searchTerm}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': 'YOUR_BING_API_KEY',
        },
      });
      setResults(response.data.webPages.value);
    } catch (error) {
      console.error('Error fetching Bing search results:', error);
    }
  };

  return (
    <div>
      <h1>Bing Search App</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
