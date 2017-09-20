const defaultData = {
  login: {
    userName: '',
    pass: '',
  },
  forceUpdateFlag: false, // 强制更新标志
}

export default (login = defaultData, action = {}) => {  
  const { type, status, msg, data, payload } = action;

  switch(type) {
    case 'LOGIN':
      return { ...login, ...data, status, msg };

    case 'LOGIN_CHANGE':
      return { ...login, ...payload, ...{status: 'success'}};

    case 'FORCE_UPDATE':
      return { ...login, ...{status: 'success', forceUpdateFlag: !login.forceUpdateFlag} };

    default: return login;
  }
};