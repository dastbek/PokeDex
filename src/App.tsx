// App.js
import React from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo";

function App() {
  return (
    <div className="App">
      <img src={"Pikachu.png"} alt="Logo" className="logo" />
      <PokemonInfo />
      <div className="footer">Made by Duy - Last updated 13/02/2025</div>
    </div>
  );
}

export default App;
