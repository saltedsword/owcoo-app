import PictureActions from '../../actions/PictureActions';
import { connect } from 'react-redux';
import ShowPicture from './ShowPicture.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const mapStateToProps = state => {
  return state.frontShowPicture;
}

const mapDispatchToProps = dispatch => {
  return {
    showPicture: payload => dispatch(PictureActions.showPicture(payload)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}
const container = connect(mapStateToProps, mapDispatchToProps)(ShowPicture);
container.contextTypes = { store: PropTypes.object };
export default container;