const defaultData = {
  tree: [],
  logo: ''
}

export default (frontHeader = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'FRONT_HEADER_INIT':
      return { ...data };

    default: return frontHeader;
  }
};