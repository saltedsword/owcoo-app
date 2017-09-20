const defaultData = {
  paths: [],
}

export default (header = defaultData, action = {}) => {  
  const { type, paths } = action;

  switch(type) {

    case 'HEADER_INIT':
      return { paths };

    default: return header;
  }
};