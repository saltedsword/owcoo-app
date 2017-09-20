const defaultData = {
  data: [],
  options: [],
  selectedOptions: [],
  total: 0,
  currentPage: 0,

  deleted: false,
}

export default (summaryList = defaultData, action = {}) => {  
  const { type, status, msg, deleted, data } = action;

  switch(type) {
    case 'SUMMARY_LIST':
      return { ...summaryList, ...data, status, msg, ...{deleted: false} };

    case 'DEL_SUMMARY':
      return { ...summaryList, status, msg, deleted };

    default: return summaryList;
  }
};