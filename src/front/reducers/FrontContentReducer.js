const defaultData = {
  columnTitle: '',
  paths: [],
  columns: []
}

export default (frontContent = defaultData, action = {}) => {  
  const { type, data, curStr } = action;

  switch(type) {
    case 'FRONT_CONTENT_INIT':
      if (data && data.paths) {
        data.paths.push({name: curStr});
      }
      return { ...frontContent, ...data };

    default: return frontContent;
  }
};