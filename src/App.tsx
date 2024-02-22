// App.js
import React from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo";

function App() {
  return (
    <div className="App">
      <img src={"Wooper.png"} alt="Logo" className="logo" />
      <PokemonInfo />
      <div className="footer">Made by Duy</div>
    </div>
  );
}

export default App;
