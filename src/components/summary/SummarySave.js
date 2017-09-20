import SummaryActions from '../../actions/SummaryActions';
import { connect } from 'react-redux';
import SummarySave from './SummarySave.jsx';
import PropTypes from 'prop-types';

// HeaderActions.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '编辑文章'}]);
const handleSubmit = function (form, dispatch) {
  form.validate((valid) => {
    if (valid) {
      dispatch(SummaryActions.saveSummary());
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

const mapStateToProps = state => {
  return state.saveSummary;
}

const mapDispatchToProps = dispatch => {
  return {
    summaryChange: payload => dispatch({ type: 'SUMMARY_CHANGE', payload: payload }),
    handleSubmit: form => handleSubmit(form, dispatch),
    summaryInit: payload => dispatch(SummaryActions.summaryInit(payload)),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(SummarySave);
container.contextTypes = { store: PropTypes.object };
export default container;