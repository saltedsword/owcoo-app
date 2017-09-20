import ManageActions from '../../actions/ManageActions';
import { connect } from 'react-redux';
import Manage from './Manage.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);

const click = (item, e, dispatch) => {
  if (item.click) {
    e.preventDefault();
    dispatch(ManageActions.manageList({search: item.search}));
  }
}

const handleClick = (ctype, dispatch) => {
  dispatch(ManageActions.manageList({search: `?c=${ctype}`, ctype}));
}

const search = (value, dispatch) => {
  const text = value ? {ctype: 'column', search: `?c=column&s=${value}`} : {ctype: 'column', search: `?c=column`};
  dispatch(ManageActions.manageList(text));
}

const mapStateToProps = state => {
  return state.manage;
}

const mapDispatchToProps = dispatch => {
  return {
    click: (item, e) => click(item, e, dispatch),
    handleClick: type => handleClick(type, dispatch),
    search: (value) => search(value, dispatch),
    manageList: (payload) => dispatch(ManageActions.manageList(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Manage);
container.contextTypes = { store: PropTypes.object };
export default container;