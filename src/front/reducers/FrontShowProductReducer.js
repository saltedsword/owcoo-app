const defaultData = {
  product: {
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

export default (frontShowProduct = defaultData, action = {}) => {  
  const { type, data } = action;
  
  switch(type) {
    
    case 'SHOW_PRODUCT':
      return { ...frontShowProduct, ...data };

    default: return frontShowProduct;
  }
};