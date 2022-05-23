import React from "react";
import "./TreeList.scss";
import {
  ITreeList,
  ITreeListConfig,
  TreeField,
  TreeItem
} from "./TreeList.types";
import { Search } from "./Search";
import { RenderField } from "./RenderField";
import { cloneDeep, isEmpty } from "lodash";
import { TreeListContext } from "./TreeListContext";
import { useTreeList } from "../hooks";

export const TreeList: React.FC<ITreeListConfig> = ({ config }) => {
  const [configuration, setConfiguration] = React.useState([...config]);
  const [selectedAll, setSelectedAll] = React.useState(false);
  const { applySearch, flattenedFields } = useTreeList(config);

  const applyConfiguration = (configuration: ITreeList) => {
    const revised = cloneDeep(configuration);
    setConfiguration(revised);
  };

  const toggleAll = (checked: boolean) => {
    const helper = (field: TreeField) => {
      field.checked = checked;
      if (field.fields?.length) {
        field.fields.forEach((field) => {
          helper(field);
        });
      }
    };

    configuration.forEach((field) => {
      field.checked = checked;
      if (field.fields?.length) {
        helper(field);
      }
    });

    applyConfiguration(configuration);
  };

  const toggleSelectAll = (checked: boolean) => {
    toggleAll(checked);
    setSelectedAll(checked);
  };

  const manipulateParentCheckboxState = (field: TreeField) => {
    let parentField: TreeItem = {} as TreeItem;
    const findParent = (
      configuration: ITreeList | TreeField[],
      parent?: TreeItem
    ) => {
      for (let i = 0; i < configuration.length; i++) {
        let config = configuration[i];
        if (config.key === field.key) {
          parentField = parent as TreeItem;
          return;
        }
        if (config.fields?.length) {
          findParent(config.fields, config as TreeItem);
        }
      }
      return null;
    };
    findParent(configuration);
    if (parentField && parentField.fields) {
      const isSelectedAll = parentField.fields.every(
        (field) => field.checked === true
      );
      parentField.checked = isSelectedAll;
    }
    return parentField;
  };

  const onSelect = (field: TreeField, checked: boolean) => {
    const helper = (field: TreeField) => {
      field.checked = checked;
      if (field.fields?.length) {
        field.fields.forEach((field) => {
          helper(field);
        });
      }
    };
    helper(field);
    let parentField = manipulateParentCheckboxState(field);
    while (!isEmpty(parentField)) {
      parentField = manipulateParentCheckboxState(parentField);
    }
    applyConfiguration(configuration);
  };

  const search = (query: string) => {
    const str = query.toLowerCase();
    if (str === "") {
      applyConfiguration(config);
    } else {
      const searchedFields = applySearch(str.toLowerCase());
      applyConfiguration(searchedFields);
    }
  };

  return (
    <TreeListContext.Provider
      value={{
        search,
        toggleSelectAll,
        onSelect,
        selectedAll,
        flattenedFields
      }}
    >
      <div className="tree-list" data-test-id="tree-list">
        <Search />
        <div className="field-sections">
          <RenderField fields={configuration} />
        </div>
      </div>
    </TreeListContext.Provider>
  );
};
