import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(result.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(
    () => {
      fetchData();
    },
    [query]
  );
  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.hits.map(hit => <li key={hit.objectID}>{hit.title}</li>)
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
