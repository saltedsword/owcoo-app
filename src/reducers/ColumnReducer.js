const defaultData = {
  column : {
      _id: '',
      name: '',
      parent: '',
      display: '',
      module: '',
    },
  data: [],
  display: [],
  module: [],
  lastEditorIndex: '',
  isSaving: false,
  lastContent: {  //用于取消时恢复原来的内容
    _id: '',
    sort: '',
    name: '',
    display: '',
  },
  dialogVisible: false,
  moveInit: [],
  moveBody: {},
  expandAll: false,

  dataFlag: false, // data数组内容变化标志
}

export default (column = defaultData, action = {}) => {  
  const { type, status, msg, data, payload } = action;

  switch(type) {
    case 'COLUMN_LIST':
      return { ...column, ...data, status, msg, ...{expandAll: false} };

    case 'COLUMN_EXPAND_ALL':
      // console.log(data)
      if (data && data.data && action.expandAll) {
        const expandTree = (node, tree) => {
          if (node.children) {
            node.children.forEach(el => {
              el.level = node.level + 1;
              el.hasExpand = true;
              tree.push(el);
              return expandTree(el, tree);
            })
          }
          return tree;
        }
        const node = { children: data.data, level: -1 };
        data.data = expandTree(node, []);
      }
      if (data) data.expandAll = action.expandAll;
      return { ...column, ...data, status, msg };

    case 'DEL_COLUMN':
      return { ...column, ...data, status, msg, ...{expandAll: false} };

    case 'SAVE_COLUMN':
      return { ...column, ...data, status, msg, ...{expandAll: false} };

    case 'COLUMN_MOVE_INIT':
      return { ...column, ...data, status, msg };

    case 'MOVE_COLUMN':
      return { ...column, ...data, status, msg, ...{expandAll: false} };

    case 'COLUMN_CHANGE':
      return { ...column, ...payload, ...{status: 'success', dataFlag: !column.dataFlag} };

    default: return column;
  }
};