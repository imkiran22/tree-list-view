import React from "react";
import { TreeItem } from "./TreeList.types";

export interface TreeListContextType {
  onSelect: (field: TreeItem, checked: boolean) => void;
  toggleSelectAll: (checked: boolean) => void;
  search: (query: string) => void;
  selectedAll: boolean;
  flattenedFields: Array<any>;
}

export const TreeListContext = React.createContext<TreeListContextType>(
  {} as TreeListContextType
);
