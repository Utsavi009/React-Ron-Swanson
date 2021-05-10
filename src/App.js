import axios from "axios";
import React, {useState, useEffect} from "react";
import "./styles.css";

function App() {

  const [data, setData ] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    //fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);

  }, [data]);

  const fetchData = async () => {
    await axios.get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes`)
    .then(response => setData(response.data))
    .catch(error => console.log(error));
    setLoading(true);
  }
  return (
    <div className="App">
      <h1>
        <a target='_blank' href="/instructions.html"> instructions </a>
      </h1>
      <img
        src="https://media.giphy.com/media/tSVnUxoWoHC/giphy.gif"
        alt="ron"
      />
      <p>QUOTE</p>
      {loading  ? <p>{data}</p> : <p>Loading...</p>  }
    </div>
  );
}

export default App;
