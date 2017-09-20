const defaultData = {
  data: [],
  options: [],
  selectedOptions: [],
  total: 0,
  currentPage: 0,

  deleted: false,
}

export default (articleList = defaultData, action = {}) => {  
  const { type, status, msg, deleted, data } = action;

  switch(type) {
    case 'ARTICLE_LIST':
      return { ...articleList, ...data, status, msg, ...{deleted: false} };

    case 'DEL_ARTICLE':
      return { ...articleList, status, msg, deleted };

    default: return articleList;
  }
};