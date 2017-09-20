const defaultData = {
  data: [],
  options: [],
  selectedOptions: [],
  total: 0,
  currentPage: 0,

  deleted: false,
}

export default (downloadList = defaultData, action = {}) => {  
  const { type, status, msg, deleted, data } = action;

  switch(type) {
    case 'DOWNLOAD_LIST':
      return { ...downloadList, ...data, status, msg, ...{deleted: false} };

    case 'DEL_DOWNLOAD':
      return { ...downloadList, status, msg, deleted };

    default: return downloadList;
  }
};