import ReleaseActions from '../../actions/ReleaseActions';
import { connect } from 'react-redux';
import Release from './Release.jsx';
import PropTypes from 'prop-types';

const _clear = (dispatch) => {
  dispatch({ type: 'RELEASE_CHANGE', payload: {saved: false} });
}

const handleClick = (column, dispatch) => {
  dispatch(ReleaseActions.getReleaseUrl(column));
}

const mapStateToProps = state => {
  return state.release;
}

const mapDispatchToProps = dispatch => {
  return {
    _clear: () => _clear(dispatch),
    handleClick: column => handleClick(column, dispatch),
    releaseInit: () => dispatch(ReleaseActions.releaseInit()),
    releaseChange: payload => dispatch({ type: 'RELEASE_CHANGE', payload: payload }),
    headerInit: (paths) => dispatch({type: 'HEADER_INIT', paths}),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Release);
container.contextTypes = { store: PropTypes.object };
export default container;
