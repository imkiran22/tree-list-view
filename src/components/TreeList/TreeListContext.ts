import React from "react";
import { TreeItem } from "./TreeList.types";

export interface TreeListContextType {
  onSelect: (field: TreeItem, checked: boolean) => void;
  toggleSelectAll: (checked: boolean) => void;
}

export const TreeListContext = React.createContext<TreeListContextType>(
  {} as TreeListContextType
);