import FetchUtil from '../../utils/frontFetch';
import CONFIG from '../../config';

const DownloadActions = {

  showDownload: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/showDownload/${payload}`);
    dispatch({ type: 'SHOW_DOWNLOAD', data: res.data });
  },

  downloadList: (payload) => async (dispatch, getState) => {
    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}front/downloadList${payload}`);
    const { list, currentPage, totalCount } = res.data;
    const data = {
      data: list,
      currentPage: currentPage,
      total: totalCount
    }
    dispatch({ type: 'DOWNLOAD_LIST', data: data });
  },

};

export default DownloadActions;