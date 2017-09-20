const defaultData = {
  data: [],
  dialogVisible: false,
  resource: {
    _id: '',
    parent: '',
    name: '',
    type: '',
    url: '', 
    icon: '',
    sort: 1,
    description: '',
  },
  resourceType: [],
  forceUpdateFlag: false, // 强制更新标志
}

export default (resourceList = defaultData, action = {}) => {  
  const { type, status, msg, data, payload } = action;

  switch(type) {
    case 'RESOURCE_LIST':
      return { ...resourceList, ...data, status, msg };

    case 'RESOURCE_INIT':
      return { ...resourceList, ...data, status, msg };

    case 'SAVE_RESOURCE':
      return { ...resourceList, ...data, status, msg };

    case 'DEL_RESOURCE':
      return { ...resourceList, ...data, status, msg };

    case 'RESOURCE_CHANGE':
      return { ...resourceList, ...payload, ...{status: 'success'}};

    case 'FORCE_UPDATE':
      return { ...resourceList, ...{status: 'success', forceUpdateFlag: !resourceList.forceUpdateFlag} };

    default: return resourceList;
  }
};