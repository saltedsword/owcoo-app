const defaultData = {
  options: [],
  column: '',
  pushUrl: '',
}

export default (release = defaultData, action = {}) => {  
  const { type, status, msg, data, pushUrl, payload } = action;

  switch(type) {
    case 'RELEASE_INIT':
      return { ...release, ...data, status, msg, ...{pushUrl: ''} };

    case 'GET_RELEASE_URL':
      return { ...release, ...data, status, msg, pushUrl };

    case 'RELEASE_CHANGE':
      return { ...release, ...payload, ...{status: 'success'}};

    default: return release;
  }
};