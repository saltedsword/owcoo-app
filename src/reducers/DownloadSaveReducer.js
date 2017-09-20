const defaultData = {
  download: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    files: [],
    version: '',
    abstract: '',
  },
  options: [],
  selectedOptions: [],

  pushUrl: '',
}

export default (saveDownload = defaultData, action = {}) => {  
  const { type, status, msg, pushUrl, data, payload } = action;

  switch(type) {
    case 'SAVE_DOWNLOAD':
      return { ...saveDownload, status, msg, pushUrl };

    case 'DOWNLOAD_INIT':
      return { ...saveDownload, ...data, status, msg, ...{pushUrl: ''} };

    case 'DOWNLOAD_CHANGE':
      return { ...saveDownload, ...payload, ...{status: 'success'}};

    default: return saveDownload;
  }
};