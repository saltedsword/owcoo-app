const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
  treeData: [],
  dialogVisible1: false,
  dialogVisible2: false,
  userGroup: {
    _id: '',
    name: '',
    description: '',
    resources: [],
  },
  forceUpdateFlag: false, // 强制更新标志
}

export default (userGroupList = defaultData, action = {}) => {  
  const { type, status, msg, data, payload } = action;

  switch(type) {
    case 'USERGROUP_LIST':
      return { ...userGroupList, ...data, status, msg };

    case 'USERGROUP_INIT':
      return { ...userGroupList, ...data, status, msg };

    case 'SAVE_USERGROUP':
      return { ...userGroupList, ...data, status, msg };

    case 'DEL_USERGROUP':
      return { ...userGroupList, ...data, status, msg };

    case 'USERGROUP_CHANGE':
      return { ...userGroupList, ...payload, ...{status: 'success'}};

    case 'FORCE_UPDATE':
      return { ...userGroupList, ...{status: 'success', forceUpdateFlag: !userGroupList.forceUpdateFlag} };

    default: return userGroupList;
  }
};