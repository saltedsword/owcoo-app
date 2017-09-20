const defaultData = {
  data: [],
  total: 0,
  currentPage: 0,
}

export default (frontArticleList = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'ARTICLE_LIST':
      return { ...frontArticleList, ...data };

    default: return frontArticleList;
  }
};