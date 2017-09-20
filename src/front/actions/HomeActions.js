import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const HomeActions = {

  frontHomeInit: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/homeInit`);
    dispatch({ type: 'FRONT_HOME_INIT', data: res.data });
  },

};

export default HomeActions;