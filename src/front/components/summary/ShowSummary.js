import SummaryActions from '../../actions/SummaryActions';
import { connect } from 'react-redux';
import ShowSummary from './ShowSummary.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const mapStateToProps = state => {
  return state.frontShowSummary;
}

const mapDispatchToProps = dispatch => {
  return {
    showSummary: payload => dispatch(SummaryActions.showSummary(payload)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ShowSummary);
container.contextTypes = { store: PropTypes.object };
export default container;