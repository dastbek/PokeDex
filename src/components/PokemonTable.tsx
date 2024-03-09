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
          <th className="sortable" onClick={() => sortData("Level")}>
            Level
          </th>
          <th className="sortable" onClick={() => sortData("Member")}>
            Member
          </th>
          <th className="sortable" onClick={() => sortData("Item")}>
            Item
          </th>
          <th className="sortable" onClick={() => sortData("Repel")}>
            Repel
          </th>
          <th className="sortable" onClick={() => sortData("Region")}>
            Region
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Map}</td>
            {searchType === "map" && <td>{row.Pokemon}</td>}
            <td
              style={{
                color:
                  row.Type === "Headbutt"
                    ? "Chartreuse"
                    : row.Type === "Surf/Fish"
                    ? "aqua"
                    : row.Type === "Fish"
                    ? "aqua"
                    : "white",
              }}
            >
              {row.Type}
            </td>
            <td>{row.Time}</td>
            <td>{row.Tier}</td>
            <td>
              <img src={row.Path} alt={row.Pokemon} />
            </td>
            <td>{row.Level}</td>
            <td>{row.Member}</td>
            <td>{row.Item}</td>
            <td style={{ color: "#FF80FF" }}>{row.Repel}</td>
            <td>{row.Region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PokemonTable; //creating stuff for the table
