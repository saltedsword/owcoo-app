const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
}

export default (frontProductList = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'PRODUCT_LIST':
      return { ...frontProductList, ...data };

    default: return frontProductList;
  }
};