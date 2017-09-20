const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
  dialogVisible: false,

  userGroups: [],
  user: {
    _id: '',
    userName: '',
    name: '',
    pass: '',
    checkPass: '',
    userGroup: '',
    phone: '',
    email: '',
    remarks: '',
  },
  forceUpdateFlag: false, // 强制更新标志
}

export default (userList = defaultData, action = {}) => {  
  const { type, status, msg, data, payload } = action;

  switch(type) {
    case 'USER_LIST':
      return { ...userList, ...data, status, msg };

    case 'USER_INIT':
      return { ...userList, ...data, status, msg };

    case 'SAVE_USER':
      return { ...userList, ...data, status, msg };

    case 'DEL_USER':
      return { ...userList, ...data, status, msg };

    case 'USER_CHANGE':
      return { ...userList, ...payload, ...{status: 'success'}};

    case 'FORCE_UPDATE':
      return { ...userList, ...{status: 'success', forceUpdateFlag: !userList.forceUpdateFlag} };

    default: return userList;
  }
};