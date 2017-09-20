const defaultData = {
  data: [],
  options: [],
  selectedOptions: [],
  total: 0,
  currentPage: 0,

  deleted: false,
}

export default (productList = defaultData, action = {}) => {  
  const { type, status, msg, deleted, data } = action;

  switch(type) {
    case 'PRODUCT_LIST':
      return { ...productList, ...data, status, msg, ...{deleted: false} };

    case 'DEL_PRODUCT':
      return { ...productList, status, msg, deleted };

    default: return productList;
  }
};