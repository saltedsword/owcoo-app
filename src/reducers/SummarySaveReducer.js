const defaultData = {
  summary: {
    _id: '',
    column: '',
    content: '',
  },
  options: [],
  selectedOptions: [],

  pushUrl: '',
}

export default (saveSummary = defaultData, action = {}) => {  
  const { type, status, msg, pushUrl, data, payload } = action;

  switch(type) {
    case 'SAVE_SUMMARY':
      return { ...saveSummary, status, msg, pushUrl };

    case 'SUMMARY_INIT':
      return { ...saveSummary, ...data, status, msg, ...{pushUrl: ''} };

    case 'SUMMARY_CHANGE':
      return { ...saveSummary, ...payload, ...{status: 'success'}};

    default: return saveSummary;
  }
};