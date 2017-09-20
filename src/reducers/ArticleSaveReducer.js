const defaultData = {
  article: {
    _id: '',
    column: '',
    title: '',
    content: '',
    status: 0,
    abstract: '',
  },
  options: [],
  selectedOptions: [],

  pushUrl: '',
}

export default (saveArticle = defaultData, action = {}) => {  
  const { type, status, msg, pushUrl, data, payload } = action;
  
  switch(type) {
    case 'SAVE_ARTICLE':
      return { ...saveArticle, status, msg, pushUrl };

    case 'ARTICLE_INIT':
      return { ...saveArticle, ...data, status, msg, ...{pushUrl: ''} };

    case 'ARTICLE_CHANGE':
      return { ...saveArticle, ...payload, ...{status: 'success'} };

    default: return saveArticle;
  }
};