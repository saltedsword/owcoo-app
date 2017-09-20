const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
}

export default (frontDownloadList = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'DOWNLOAD_LIST':
      return { ...frontDownloadList, ...data };

    default: return frontDownloadList;
  }
};