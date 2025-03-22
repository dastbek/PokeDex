// App.js
import React from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo";

function App() {
  return (
    <div className="App">
      <img src={"dragonite-dragonite-mail.gif"} alt="Logo" className="logo" />
      <PokemonInfo />
      <div className="footer">Made by Duy - Last updated {new Date().toLocaleDateString()}</div>
    </div>
  );
}

export default App;
