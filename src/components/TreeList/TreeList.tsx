import React from "react";
import "./TreeList.scss";
import { ITreeListConfig, TreeField } from "./TreeList.types";
import { Search } from "./Search";
import { RenderField } from "./RenderField";
import _ from "lodash";

export const TreeList: React.FC<ITreeListConfig> = ({ config }) => {
  const [configuration, setConfiguration] = React.useState(config);
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

    const revised = _.cloneDeep(configuration);

    setConfiguration(revised);
  };

  const toggleSelectAll = (checked: boolean) => {
    toggleAll(checked);
  };

  return (
    <div className="tree-list" data-test-id="tree-list">
      <Search toggleSelectAll={toggleSelectAll} />
      <div className="field-sections">
        <RenderField fields={configuration} />
      </div>
    </div>
  );
};
