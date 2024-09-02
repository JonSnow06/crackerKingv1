// components/Autocomplete.js
import React from "react";
import styles from "../styles/Autocomplete.module.css"; // Import the CSS module for styling

const Autocomplete = ({ suggestions = [], onChange, value }) => {
  return (
    <div className={styles.autocompleteContainer}>
      <input
        type="text"
        className={styles.autocompleteInput}
        placeholder="Search..."
        onChange={onChange}
        value={value}
        list="autocompleteSuggestions"
      />
      <span className={styles.searchIcon}>&#128269;</span>{" "}
      <datalist id="autocompleteSuggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </div>
  );
};

export default Autocomplete;
