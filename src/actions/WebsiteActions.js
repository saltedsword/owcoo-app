import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const WebsiteActions = {

  saveWebsite: () => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_WEBSITE', status: 'loading' });

      const website = getState().website.website;
      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}website/save`, JSON.stringify({website}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_WEBSITE', status: 'error', msg: res.msg });
      dispatch({ type: 'SAVE_WEBSITE', status: 'saved', msg:res.msg, saved: true });
  },

  websiteInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'WEBSITE_INIT', status: 'loading' });
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}website/saveInit`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'WEBSITE_INIT', status: 'error', msg: res.msg });
    dispatch({ type: 'WEBSITE_INIT', status: 'success', msg:res.msg, data: res.data });    
  },

};

export default WebsiteActions;