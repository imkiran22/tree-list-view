import React from "react";
import { Checkbox } from "../Checkbox";
import { ITreeList, TreeField } from "../TreeList.types";
import { RenderChildren } from "./RenderChildren";

export const RenderField: React.FC<{ fields: ITreeList }> = ({ fields }) => {
  return (
    <React.Fragment>
      {fields.map((field: TreeField) => (
        <ul key={field.key} className={`ul section-field ${field.key}`}>
          <Checkbox field={field} key={field.key} />
          {field.fields && field.fields.length > 0 && (
            <RenderChildren config={field.fields as any} />
          )}
        </ul>
      ))}
    </React.Fragment>
  );
};
