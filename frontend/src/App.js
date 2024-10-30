import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [list, setList] = useState([]);

  const tableData = (item) => {
    console.log(item);
    fetch(
      `http://localhost:8085/api/rates`
    )
      .then((response) => response.json())
      .then((json) => setList(json));
  };
  return (
    <div className="App">
      {list}
    </div>
  );
}

export default App;
