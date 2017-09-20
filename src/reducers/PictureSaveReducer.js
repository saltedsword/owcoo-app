const defaultData = {
  picture: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    subImgs: [],
    abstract: '',
  },
  options: [],
  selectedOptions: [],

  pushUrl: '',
}

export default (savePicture = defaultData, action = {}) => {  
  const { type, status, msg, pushUrl, data, payload } = action;

  switch(type) {
    case 'SAVE_PICTURE':
      return { ...savePicture, status, msg, pushUrl };

    case 'PICTURE_INIT':
      return { ...savePicture, ...data, status, msg, ...{pushUrl: ''} };

    case 'PICTURE_CHANGE':
      return { ...savePicture, ...payload, ...{status: 'success'}};

    default: return savePicture;
  }
};