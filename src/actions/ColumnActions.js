import FetchUtil from '../utils/fetch';
import CONFIG from '../config';

const ColumnActions = {

  saveColumn: (column) => async (dispatch, getState) => {
      dispatch({ type: 'SAVE_COLUMN', status: 'loading' });

      const res = await FetchUtil.postData(`${CONFIG.BASE_URL}column/save`, JSON.stringify({column}));
      if (res === false) return;
      if (res.code !== 200) return dispatch({ type: 'SAVE_COLUMN', status: 'error', msg: res.msg });
      const data = Object.assign(res.data, {isSaving: false, lastEditorIndex: '', lastContent: {
          _id: '',
          sort: '',
          name: '',
          display: '',
        }});
      dispatch({ type: 'SAVE_COLUMN', status: 'success', msg:res.msg, data: data });
  },

  columnList: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'COLUMN_LIST', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}column/list`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'COLUMN_LIST', status: 'error', msg: res.msg });
    dispatch({ type: 'COLUMN_LIST', status: 'success', msg:res.msg, data: res.data });  
  },

  columnExpandAll: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'COLUMN_EXPAND_ALL', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}column/list`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'COLUMN_EXPAND_ALL', status: 'error', msg: res.msg });
    dispatch({ type: 'COLUMN_EXPAND_ALL', status: 'success', msg:res.msg, data: res.data, expandAll: payload });  
  },

  delColumn: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'DEL_COLUMN', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}column/del/${payload}`);
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'DEL_COLUMN', status: 'error', msg: res.msg });
    dispatch({ type: 'DEL_COLUMN', status: 'success', msg:res.msg, data: res.data });    
  },

  columnMoveInit: (payload) => async (dispatch, getState) => {
    dispatch({ type: 'COLUMN_MOVE_INIT', status: 'loading' });

    const res = await FetchUtil.fetchData(`${CONFIG.BASE_URL}column/moveInit/${payload}`)
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'COLUMN_MOVE_INIT', status: 'error', msg: res.msg });
    const data = Object.assign(res.data, { dialogVisible: true, moveBody: {_id: payload} });
    dispatch({ type: 'COLUMN_MOVE_INIT', status: 'success', msg:res.msg, data: data });    
  },

  moveColumn: (column) => async (dispatch, getState) => {
    dispatch({ type: 'MOVE_COLUMN', status: 'loading' });

    const res = await FetchUtil.postData(`${CONFIG.BASE_URL}column/move`, JSON.stringify({column}));
    if (res === false) return;
    if (res.code !== 200) return dispatch({ type: 'MOVE_COLUMN', status: 'error', msg: res.msg });
    const data = Object.assign(res.data, { dialogVisible: false, moveBody: {} });
    dispatch({ type: 'MOVE_COLUMN', status: 'success', msg:res.msg, data: data });
  },
};

export default ColumnActions;