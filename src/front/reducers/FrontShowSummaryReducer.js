const defaultData = {
  summary: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    createAt: '',
    pv: 0,
  }
}

export default (frontShowSummary = defaultData, action = {}) => {  
  const { type, data } = action;
  
  switch(type) {
    
    case 'SHOW_SUMMARY':
      return { ...frontShowSummary, ...data };

    default: return frontShowSummary;
  }
};