import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const PictureActions = {

  showPicture: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/showPicture/${payload}`);
    dispatch({ type: 'SHOW_PICTURE', data: res.data });
  },

  pictureList: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/pictureList${payload}`);
    const { list, currentPage, totalCount } = res.data;
    const data = {
      data: list,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'PICTURE_LIST', data: data });
  },

};

export default PictureActions;