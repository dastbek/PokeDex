import React from "react";
import Autosuggest from "react-autosuggest";
import { debounce } from "lodash";

interface SearchBarProps {
  value: string;
  suggestions: string[];
  onChange: (newValue: string) => void;
  onSuggestionsFetchRequested: ({ value }: { value: string }) => void;
  onSuggestionsClearRequested: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  suggestions,
  onChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
}) => {
  const inputProps = {
    placeholder: "Search for a Map or Pokemon",
    value,
    onChange: (
      event: React.FormEvent<any>,
      { newValue }: Autosuggest.ChangeEvent
    ) => {
      onChange(newValue);
    },
  };

  return (
    <div className="search-bar-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
