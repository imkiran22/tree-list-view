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
import _ from "lodash";
import { TreeListContext } from "./TreeListContext";

export const TreeList: React.FC<ITreeListConfig> = ({ config }) => {
  const [configuration, setConfiguration] = React.useState(config);

  const applyConfiguration = (configuration: ITreeList) => {
    const revised = _.cloneDeep(configuration);
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
    applyConfiguration(configuration);
  };

  return (
    <TreeListContext.Provider value={{ toggleSelectAll, onSelect }}>
      <div className="tree-list" data-test-id="tree-list">
        <Search toggleSelectAll={toggleSelectAll} />
        <div className="field-sections">
          <RenderField fields={configuration} />
        </div>
      </div>
    </TreeListContext.Provider>
  );
};
