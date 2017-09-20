const defaultData = {
  data: [],
  options: [],
  selectedOptions: [],
  total: 0,
  currentPage: 0,

  deleted: false,
}

export default (pictureList = defaultData, action = {}) => {  
  const { type, status, msg, deleted, data } = action;

  switch(type) {
    case 'PICTURE_LIST':
      return { ...pictureList, ...data, status, msg, ...{deleted: false} };

    case 'DEL_PICTURE':
      return { ...pictureList, status, msg, deleted };

    default: return pictureList;
  }
};