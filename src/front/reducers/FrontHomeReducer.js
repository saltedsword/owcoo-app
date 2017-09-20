const defaultData = {
  banner: [],
  aboutUs: {
    id: '',
    content: '',
    pic: []
  },
  articles: [],
  moreArticles: '',
  products: [],
  moreProducts: '',
  pictures: [],
  morePictures: '',
  meta: {
    title: '',
    meta: {
      name: {
        keywords: '',
        description: '',
      }
    },
    link: {
      rel: {
        'shortcut icon': ''
      }
    },
  }
}

export default (frontHome = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'FRONT_HOME_INIT':
      return { ...data };

    default: return frontHome;
  }
};