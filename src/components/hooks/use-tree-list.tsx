import { cloneDeep, findIndex, includes, isEmpty, pick } from "lodash";
import React from "react";

function flattenFields(config) {
  const flatArr = [];
  var recursive = (arr, parent = []) => {
    arr.forEach((object) => {
      const newField: any = pick(object, ["name", "key"]);
      newField.parent = parent;
      flatArr.push(newField);
      if (!isEmpty(object.fields)) {
        recursive(object.fields, newField.parent.concat(newField.key));
      }
    });
  };
  recursive(config);
  return flatArr;
}

export const useTreeList = (config) => {
  const [flattenedFields, setFlattenedFields] = React.useState([]);

  React.useEffect(() => {
    const flattenedFields = flattenFields(config);
    setFlattenedFields(flattenedFields);
  }, [config]);

  const applySearch = (str: string) => {
    const validSearches = [];
    flattenedFields.forEach((field) => {
      const word = field.name.toLowerCase();
      if (word.startsWith(str)) {
        validSearches.push(field);
      }
    });
    // console.log(validSearches);
    const arr = [];
    const helper = (arr, config, keys) => {
      if (!keys.length) return;
      const key = keys.shift();
      let index = findIndex(arr, { key });
      if (index === -1) {
        let index = findIndex(config, { key });
        let field = { ...cloneDeep(config[index]), fields: [] };
        arr.push(field);

        let newIndex = findIndex(arr, { key });
        helper(arr[newIndex]?.fields || [], config[index]?.fields || [], keys);
      } else if (!isEmpty(arr[index].fields)) {
        let newIndex = findIndex(config, { key });
        helper(arr[index].fields, config[newIndex].fields, keys);
      }
    };
    validSearches.forEach((searchedField) => {
      const { key, parent } = searchedField;
      const keys = [...parent].concat(key);
      helper(arr, config, keys);
    });
    // console.log(arr);
    return arr;
  };

  return { flattenedFields, applySearch };
};
