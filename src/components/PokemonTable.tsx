import React from "react";
import "./PokemonTable.css"; // Import the CSS file

interface PokemonTableProps {
  data: Array<any>;
  searchType: string; // Add this line
  sortData: (column: keyof any) => void; // Add this line
}

const PokemonTable: React.FC<PokemonTableProps> = ({
  data,
  searchType,
  sortData,
}) => (
  <div className="scrollable-table">
    <table>
      <thead>
        <tr>
          <th className="sortable" onClick={() => sortData("Map")}>
            Map
          </th>
          {searchType === "map" && (
            <th onClick={() => sortData("Pokemon")}>Pokemon</th>
          )}
          <th className="sortable" onClick={() => sortData("Type")}>
            Type
          </th>
          <th className="sortable" onClick={() => sortData("Time")}>
            Time
          </th>
          <th className="sortable" onClick={() => sortData("Tier")}>
            Tier
          </th>
          <th className="sortable" onClick={() => sortData("Sprite")}>
            Sprite
          </th>
          <th className="sortable" onClick={() => sortData("Member")}>
            Member
          </th>
          <th className="sortable" onClick={() => sortData("Item")}>
            Item
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Map}</td>
            {searchType === "map" && <td>{row.Pokemon}</td>}
            <td>{row.Type}</td>
            <td>{row.Time}</td>
            <td>{row.Tier}</td>
            <td>
              <img src={row.Path} alt={row.Pokemon} /> {/* Add this line */}
            </td>
            <td>{row.Member}</td>
            <td>{row.Item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PokemonTable; //creating stuff for the table
