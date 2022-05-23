import { cloneDeep, findIndex, isEmpty, pick } from "lodash";
import React from "react";

function flattenFields(config: any) {
  const flatArr: any = [];
  var recursive = (arr: any, parent = []) => {
    arr.forEach((object: any) => {
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

export const useTreeList = (config: any) => {
  const [flattenedFields, setFlattenedFields] = React.useState([]);

  React.useEffect(() => {
    const flattenedFields = flattenFields(config);
    setFlattenedFields(flattenedFields);
  }, [config]);

  const applySearch = (str: string) => {
    const validSearches: any = [];
    flattenedFields.forEach((field: any) => {
      const word = field.name.toLowerCase();
      if (word.startsWith(str)) {
        validSearches.push(field);
      }
    });
    // console.log(validSearches);
    const arr: any = [];
    const helper = (arr: any, config: any, keys: any) => {
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
    validSearches.forEach((searchedField: any) => {
      const { key, parent } = searchedField;
      const keys = [...parent].concat(key);
      helper(arr, config, keys);
    });
    // console.log(arr);
    return arr;
  };

  return { flattenedFields, applySearch };
};
