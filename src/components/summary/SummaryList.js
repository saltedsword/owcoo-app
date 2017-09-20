import SummaryActions from '../../actions/SummaryActions';
import { connect } from 'react-redux';
import SummaryList from './SummaryList.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSelect = (value, searchParams, dispatch) => {
  searchParams.set('p', 1);
  searchParams.set('column', value);
  dispatch(SummaryActions.summaryList('?' + searchParams.toString()));
}

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(SummaryActions.summaryList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.summaryList;
}

const mapDispatchToProps = dispatch => {
  return {
    handleSelect: (value, searchParams) => handleSelect(value, searchParams, dispatch),
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    summaryList: searchString => dispatch(SummaryActions.summaryList(searchString)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(SummaryList);
container.contextTypes = { store: PropTypes.object };
export default container;