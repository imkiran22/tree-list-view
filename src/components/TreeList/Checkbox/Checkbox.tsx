import React from "react";
import { TreeField } from "../TreeList.types";

export const Checkbox: React.FC<{ field: TreeField }> = ({ field }) => {
  const [state, setState] = React.useState(field.checked);
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
        }}
      ></input>
      {field.name}
    </label>
  );
};
