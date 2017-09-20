const defaultData = {
  website: {
    _id: '',
    title: '',
    logo: [],
    ico: [],
    keywords: '',
    description: '',
    rights: '',
    aboutUsId: '',
    aboutUsContent: '',
    aboutUsPic: [],
    banner: []
  },
  aboutUsOptions: [],
  aboutUsSelectOptions: [],
  saved: false,
}

export default (website = defaultData, action = {}) => {  
  const { type, status, msg, data, saved, payload } = action;

  switch(type) {
    case 'SAVE_WEBSITE':
      return { ...website, ...data, status, msg, saved };

    case 'WEBSITE_INIT':
      return { ...website, ...data, status, msg, ...{saved: false} };

    case 'WEBSITE_CHANGE':
      return { ...website, ...payload, ...{status: 'success'}};

    default: return website;
  }
};