import FrontContentActions from '../../actions/FrontContentActions';
import FrontActions from '../../actions/FrontActions';

export default (payload, dispatch) => {
  dispatch(FrontActions.frontInit(payload));
  dispatch(FrontContentActions.frontContentInit(payload));
}