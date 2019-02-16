import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const fetchData = async () => {
    const result = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${query}`
    );
    setData(result.data);
  };
  useEffect(
    () => {
      try {
        fetchData();
      } catch (error) {
        console.log("error", error);
      }
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
      {data.hits.map(hit => (
        <li key={hit.objectID}>{hit.title}</li>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
