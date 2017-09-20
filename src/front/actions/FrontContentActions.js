import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const FrontContentActions = {

  frontContentInit: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/contentInit${payload[0]}`);
    dispatch({ type: 'FRONT_CONTENT_INIT', data: res.data, curStr: payload[1] || '' });
  },

};

export default FrontContentActions;