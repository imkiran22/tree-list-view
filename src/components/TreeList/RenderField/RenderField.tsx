import React from "react";
import { Checkbox } from "../Checkbox";
import { ITreeList, TreeField } from "../TreeList.types";
import { RenderChildren } from "./RenderChildren";

export const RenderField: React.FC<{ fields: ITreeList }> = ({ fields }) => {
  const onDragStart = (ev: React.DragEvent<HTMLUListElement | unknown>) => {
    ev.dataTransfer.setData("text", (ev.target as Element).id);
    (ev.target as HTMLElement).style.opacity = "0.1";
    ((ev.target as Element)
      .parentElement as HTMLElement).style.backgroundColor = "aliceblue";
  };

  const swap = (a: Element, b: Element) => {
    try {
      let dummy = document.createElement("ul");
      a.before(dummy);
      b.before(a);
      dummy.replaceWith(b);
    } catch (e) {
      console.warn(e);
    }
  };

  const onDrop = (ev: React.DragEvent<HTMLUListElement>) => {
    ev.preventDefault();
    const key = ev.dataTransfer.getData("text");
    const droppedElement = (ev.target as Element).closest("ul") as Element;
    const draggedElement = document.getElementById(key) as Element;
    swap(droppedElement, draggedElement);
  };

  const onDragOver = (ev: React.DragEvent<HTMLUListElement>) => {
    ev.preventDefault();
  };

  const onDragEnd = (ev: React.DragEvent<HTMLUListElement>) => {
    (ev.target as HTMLElement).style.opacity = "1";
    ((ev.target as Element)
      .parentElement as HTMLElement).style.backgroundColor = "transparent";
  };

  return (
    <React.Fragment>
      {fields.map((field: TreeField) => (
        <ul
          draggable="true"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          id={field.key}
          onDragOver={onDragOver}
          key={field.key}
          className={`ul section-field ${field.key}`}
        >
          <Checkbox field={field} key={field.key} />
          {field.fields && field.fields.length > 0 && (
            <RenderChildren config={field.fields as any} />
          )}
        </ul>
      ))}
    </React.Fragment>
  );
};
