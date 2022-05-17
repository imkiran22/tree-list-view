export interface TreeField {
  name: string;
  id?: string;
  key: string;
  checked: boolean;
  fields?: Array<TreeField>;
}

export interface TreeItem extends TreeField {
  fields: Array<TreeField>;
}

export type ITreeList = Array<TreeItem>;

export type ITreeListConfig = {
  config: ITreeList;
};
