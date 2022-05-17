import React from "react";
import "./Search.scss";

export const Search: React.FC<{ toggleSelectAll: Function }> = ({
  toggleSelectAll
}) => {
  const [searchInput, setSearchInput] = React.useState("");
  const selectAll = (ev: React.ChangeEvent<HTMLInputElement>) => {
    toggleSelectAll(ev.target.checked);
  };

  return (
    <div className="search-tree-list" data-test-id="search-tree-list">
      <input
        type="checkbox"
        name="select-all"
        id="select-all"
        onChange={(ev) => selectAll(ev)}
      ></input>
      <input
        className="search"
        id="search"
        value={searchInput}
        onChange={(ev) => setSearchInput(ev.target.value)}
      />
    </div>
  );
};
