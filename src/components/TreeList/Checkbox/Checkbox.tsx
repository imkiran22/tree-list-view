import React from "react";
import { TreeField } from "../TreeList.types";
import { TreeListContext } from "../TreeListContext";

export const Checkbox: React.FC<{ field: TreeField }> = ({ field }) => {
  const [state, setState] = React.useState(field.checked);
  const { onSelect } = React.useContext(TreeListContext);
  React.useEffect(() => {
    setState(field.checked);
  }, [field]);
  return (
    <label>
      <input
        key={field.key}
        type="checkbox"
        checked={state}
        name={field.name}
        id={field.key}
        onChange={(ev) => {
          setState(ev.target.checked);
          onSelect(field, ev.target.checked);
        }}
      ></input>
      {field.name}
    </label>
  );
};
