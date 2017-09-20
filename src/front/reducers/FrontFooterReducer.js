const defaultData = {
  tree: [],
  rights: ''
}

export default (frontFooter = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'FRONT_FOOTER_INIT':
      return { ...data };

    default: return frontFooter;
  }
};