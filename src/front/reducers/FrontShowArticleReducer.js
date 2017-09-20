const defaultData = {
  article: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    createAt: '',
    pv: 0,
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

export default (frontShowArticle = defaultData, action = {}) => {  
  const { type, data } = action;
  
  switch(type) {
    
    case 'SHOW_ARTICLE':
      return { ...frontShowArticle, ...data };

    default: return frontShowArticle;
  }
};