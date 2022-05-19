import React from "react";
import { TreeListContext } from "../TreeListContext";
import "./Search.scss";

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const { toggleSelectAll, search } = React.useContext(TreeListContext);
  const selectAll = (ev: React.ChangeEvent<HTMLInputElement>) => {
    toggleSelectAll(ev.target.checked);
  };

  //Implement debounce
  const onChangeCallback = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const query = ev.target.value;
    setSearchInput(query);
    search(query);
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
        onChange={onChangeCallback}
      />
    </div>
  );
};
