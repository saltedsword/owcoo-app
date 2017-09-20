const defaultData = {
  meta: {
    title: '',
    meta: {
      name: {
        keywords: '',
        description: '',
      }
    }
  }
}

export default (front = defaultData, action = {}) => {  
  const { type, data } = action;

  switch(type) {
    case 'FRONT_INIT':
      return { ...front, ...data };

    default: return front;
  }
};