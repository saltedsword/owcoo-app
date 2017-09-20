import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const SummaryActions = {

  showSummary: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/showSummary/${payload}`);
    dispatch({ type: 'SHOW_SUMMARY', data: res.data });
  },

};

export default SummaryActions;