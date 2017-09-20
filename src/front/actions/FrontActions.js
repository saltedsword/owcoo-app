import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const FrontActions = {

  frontInit: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/init${payload[0]}`);

    dispatch({ type: 'FRONT_INIT', data: res.data });
  },

};

export default FrontActions;