import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import SearchBar from "./SearchBar";
import PokemonTable from "./PokemonTable";
import { debounce } from "lodash";

const PokemonInfo: React.FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [displayData, setDisplayData] = useState<Array<any>>([]);
  const [searchType, setSearchType] = useState("pokemon");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    Papa.parse("spawns.csv", {
      download: true,
      header: true,
      complete: (results) => {
        console.log(results.data); // Print the parsed data
        setData(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      debouncedSetDisplayData(search);
    }
  }, [search, data]); // Recalculate displayData when search or data changes

  // const debouncedSetDisplayData = debounce((search: string) => {
  //   const filteredData = data.filter(
  //     (row) =>
  //       (row.Pokemon && row.Pokemon.toLowerCase() === search.toLowerCase()) ||
  //       (row.Map && row.Map.toLowerCase() === search.toLowerCase())
  //   );
  //   setDisplayData(filteredData);

  //   // Update searchType based on the search input
  //   const isPokemon = data.some(
  //     (row) => row.Pokemon.toLowerCase() === search.toLowerCase()
  //   );
  //   setSearchType(isPokemon ? "pokemon" : "map");
  //   console.log("searchType", searchType);
  // }, 500); // Delay of 500ms

  const debouncedSetDisplayData = debounce((search: string) => {
    const filteredData = data.filter(
      (row) =>
        (row.Pokemon && row.Pokemon.toLowerCase() === search.toLowerCase()) ||
        (row.Map && row.Map.toLowerCase() === search.toLowerCase())
    );
    setDisplayData(filteredData);

    // Update searchType based on the search input
    const isMap = data.some(
      (row) => row.Map && row.Map.toLowerCase() === search.toLowerCase()
    );
    const isPokemon = data.some(
      (row) => row.Pokemon && row.Pokemon.toLowerCase() === search.toLowerCase()
    );

    if (isMap) {
      setSearchType("map");
    } else if (isPokemon) {
      setSearchType("pokemon");
    }
  }, 500); // Delay of 500ms

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    debouncedSetSuggestions(value);
  };

  const filteredData = data.filter(
    (row) =>
      (row.Pokemon &&
        row.Pokemon.toLowerCase().includes(search.toLowerCase())) ||
      (row.Map && row.Map.toLowerCase().includes(search.toLowerCase()))
  );

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const debouncedSetSuggestions = debounce((value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const newSuggestions = data
      .map((row) => [row.Pokemon, row.Map]) // Include both Pokemon and Map in the suggestions
      .flat()
      .filter((name) => name && name.toLowerCase().includes(lowerCaseValue));

    setSuggestions(Array.from(new Set(newSuggestions))); // Remove duplicates
  }, 300); // Delay of 300ms

  // const debouncedSetSuggestions = debounce((value: string) => {
  //   const lowerCaseValue = value.toLowerCase();

  //   const exactMatch = data.some(
  //     (row) =>
  //       row.Pokemon.toLowerCase() === lowerCaseValue ||
  //       row.Map.toLowerCase() === lowerCaseValue
  //   );

  //   if (!exactMatch) {
  //     const newSuggestions = data
  //       .map((row) => [row.Pokemon, row.Map]) // Include both Pokemon and Map in the suggestions
  //       .flat()
  //       .filter((name) => name && name.toLowerCase().includes(lowerCaseValue));

  //     setSuggestions(Array.from(new Set(newSuggestions))); // Remove duplicates
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, 300); // Delay of 300ms

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const debouncedSetSearch = debounce(setSearch, 300); // Delay of 300ms

  const sortData = (column: keyof (typeof data)[0]) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc"); // Toggle sort direction
  };

  return (
    <div className="container">
      <SearchBar
        value={search}
        suggestions={suggestions}
        onChange={setSearch}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
      />
      <PokemonTable
        data={displayData}
        searchType={searchType}
        sortData={sortData}
      />
    </div>
  );
};

export default PokemonInfo;
