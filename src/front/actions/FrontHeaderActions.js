import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const FrontHeaderActions = {

  frontHeaderInit: () => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/headerInit`);
    dispatch({ type: 'FRONT_HEADER_INIT', data: res.data });
  },

};

export default FrontHeaderActions;