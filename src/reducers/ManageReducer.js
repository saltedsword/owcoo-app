const defaultData = {
  data: [], 
  noresults: true,
  linkClass: ['module-link-clicked', 'column-link'],
}

export default (manage = defaultData, action = {}) => {  
  const { type, status, msg, data, ctype } = action;

  switch(type) {
    case 'MANAGE_LIST':
      const noresults = !data || data.length === 0;

      let linkClass;
      switch (ctype) {
        case 'column': linkClass = ['module-link', 'column-link-clicked']; break;
        case 'module': linkClass = ['module-link-clicked', 'column-link']; break;
        default: linkClass = manage.linkClass;
      }
      return { ...manage, data, status, msg, noresults, linkClass };

    default: return manage;
  }
};