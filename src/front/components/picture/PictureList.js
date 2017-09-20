import PictureActions from '../../actions/PictureActions';
import { connect } from 'react-redux';
import PictureList from './PictureList.jsx';
import PropTypes from 'prop-types';
import frontInit from '../common/frontInit';

const handlePage = (currentPage, searchParams, dispatch) => {
  searchParams.set('p', currentPage);
  dispatch(PictureActions.pictureList('?' + searchParams.toString()));
}

const mapStateToProps = state => {
  return state.frontPictureList;
}

const mapDispatchToProps = dispatch => {
  return {
    handlePage: (currentPage, searchParams) => handlePage(currentPage, searchParams, dispatch),
    pictureList: searchString => dispatch(PictureActions.pictureList(searchString)),
    frontInit: (payload) => frontInit(payload, dispatch),
  }
}

const container = connect(mapStateToProps, mapDispatchToProps)(PictureList);
container.contextTypes = { store: PropTypes.object };
export default container;