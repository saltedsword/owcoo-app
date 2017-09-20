const defaultData = {
  picture: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    createAt: '',
    pv: 0,
    subImgs: [],
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

export default (frontShowPicture = defaultData, action = {}) => {  
  const { type, data } = action;
  
  switch(type) {
    
    case 'SHOW_PICTURE':
      return { ...frontShowPicture, ...data };

    default: return frontShowPicture;
  }
};