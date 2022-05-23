import React from "react";
import { Checkbox } from "../Checkbox";
import { TreeField } from "../TreeList.types";

export const RenderChildren: React.FC<{ config: TreeField[] }> = ({
  config
}) => {
  return (
    <React.Fragment>
      {config.map((field) => {
        if (field.fields?.length) {
          return (
            <ul draggable="true" className="ul" id={field.key} key={field.key}>
              <Checkbox field={field} key={field.key} />
              <RenderChildren config={field.fields} />
            </ul>
          );
        }
        return (
          <ul draggable="true" className="ul" id={field.key} key={field.key}>
            <li key={field.key}>
              <Checkbox field={field} />
            </li>
          </ul>
        );
      })}
    </React.Fragment>
  );
};
