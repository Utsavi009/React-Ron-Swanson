import axios from "axios";
import React, {useState, useEffect} from "react";
import KanyeGif from "./KanyeGif";
import "./styles.css";

const App = () => {
     
    const [quote, setQuote ] = useState();
    const [loading, setLoading] = useState(false);
  
    console.log(quote);
  
    useEffect(() => {
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 5000);
  
      return () => clearInterval(interval);
  
    }, []);
  
    const fetchData = async () => {
      await axios.get(`https://api.kanye.rest/`)
      .then(response => { 
        if(!quote)
          return setQuote({current: response.data.quote, previous: []})
        setQuote((quote) => ({
          current: response.data.quote,
          previous: [quote.current, ...quote.previous]
        }))
      })
      .catch(error => console.log(error));
    }  


  return (
    <div className="App">
      <h1>
        <a target='_blank' href="/instructions1.html"> instructions </a>
      </h1>
      <KanyeGif />
      {loading ? <h1>Loading..</h1> : 
      <div>
        <h2>QUOTE</h2>
        <p>{quote && quote.current}</p>
        <h3>PREVIOUS QUOTES</h3>
        {quote && quote.previous.slice(0, 10).map((item) => {
              return <p> {item} </p>;})}
      </div>}
    </div>
  );
};

export default App;
