const defaultData = {
  download: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    createAt: '',
    pv: 0,
    files: []
  },
  pre: {
    _id: '',
    title: '',
  },
  next: {
    _id: '',
    title: '',
  }
}

export default (frontShowDownload = defaultData, action = {}) => {  
  const { type, data } = action;
  
  switch(type) {
    
    case 'SHOW_DOWNLOAD':
      return { ...frontShowDownload, ...data };

    default: return frontShowDownload;
  }
};