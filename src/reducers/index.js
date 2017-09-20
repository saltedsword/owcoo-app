import { combineReducers } from 'redux';
import saveArticle from './ArticleSaveReducer';
import articleList from './ArticleListReducer';
import saveDownload from './DownloadSaveReducer';
import downloadList from './DownloadListReducer';
import savePicture from './PictureSaveReducer';
import pictureList from './PictureListReducer';
import saveProduct from './ProductSaveReducer';
import productList from './ProductListReducer';
import saveSummary from './SummarySaveReducer';
import summaryList from './SummaryListReducer';
import column from './ColumnReducer';
import resourceList from './ResourceListReducer';
import userList from './UserListReducer';
import userGroupList from './UserGroupListReducer';
import website from './WebsiteReducer';
import release from './ReleaseReducer';
import manage from './ManageReducer';
import login from './LoginReducer';
import header from './HeaderReducer';

import frontReducers from '../front/reducers';

export default combineReducers({...{
  saveArticle,
  articleList,
  saveDownload,
  downloadList,
  savePicture,
  pictureList,
  saveProduct,
  productList,
  saveSummary,
  summaryList,
  column,
  resourceList,
  userList,
  userGroupList,
  website,
  release,
  manage,
  login,
  header
},...frontReducers})