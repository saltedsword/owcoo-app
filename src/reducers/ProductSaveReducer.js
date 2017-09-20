const defaultData = {
  product: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    subImgs: [],
    abstract: '',
    price: ''
  },
  options: [],
  selectedOptions: [],

  pushUrl: '',
}

export default (saveProduct = defaultData, action = {}) => {  
  const { type, status, msg, pushUrl, data, payload } = action;

  switch(type) {
    case 'SAVE_PRODUCT':
      return { ...saveProduct, status, msg, pushUrl };

    case 'PRODUCT_INIT':
      return { ...saveProduct, ...data, status, msg, ...{pushUrl: ''} };

    case 'PRODUCT_CHANGE':
      return { ...saveProduct, ...payload, ...{status: 'success'}};

    default: return saveProduct;
  }
};