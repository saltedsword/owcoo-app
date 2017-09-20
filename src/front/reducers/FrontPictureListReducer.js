const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
}

export default (frontPictureList = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'PICTURE_LIST':
      return { ...frontPictureList, ...data };

    default: return frontPictureList;
  }
};