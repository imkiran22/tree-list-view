import React from "react";
import { TreeListContext } from "../TreeListContext";
import "./Search.scss";

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const { toggleSelectAll, search, selectedAll } = React.useContext(
    TreeListContext
  );
  const selectAll = (ev: React.ChangeEvent<HTMLInputElement>) => {
    toggleSelectAll(ev.target.checked);
  };

  //Implement debounce
  const onChangeCallback = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const query = ev.target.value;
    setSearchInput(query);
    search(query);
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      toggleSelectAll(!selectedAll);
    }
  };

  return (
    <div className="search-tree-list" data-test-id="search-tree-list">
      <input
        type="checkbox"
        name="select-all"
        checked={selectedAll}
        id="select-all"
        onChange={(ev) => selectAll(ev)}
      ></input>
      <input
        className="search"
        id="search"
        value={searchInput}
        onKeyPress={onKeyPress}
        onChange={onChangeCallback}
        autoComplete="off"
      />
    </div>
  );
};
