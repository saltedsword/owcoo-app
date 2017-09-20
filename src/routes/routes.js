import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { needLogin } from '../middlewares';
import { 
        App,
        Admin,
        Home, 
        NotFound,
        Manage,
        Release,
        SummaryList, 
        SummarySave, 
        PictureList, 
        PictureSave, 
        ArticleList, 
        ArticleSave, 
        ProductList, 
        ProductSave, 
        DownloadList, 
        DownloadSave,
        Column,
        ResourceList,
        UserGroupList,
        UserList,
        Login,
        Website
        } from '../components/';

import { 
  Front,
  FrontHome,
  FrontArticleList,
  FrontShowArticle,
  FrontDownloadList,
  FrontShowDownload,
  FrontPictureList,
  FrontShowPicture,
  FrontProductList,
  FrontShowProduct,
  FrontShowSummary
  } from '../front/components';


const routes = 
<Route path='/' component={App}>
  <IndexRoute component={FrontHome} />
  <Route path='' component={Front}>
    <Route path='articleList' component={FrontArticleList}/>
    <Route path='showArticle/:id' component={FrontShowArticle}/>
    <Route path='downloadList' component={FrontDownloadList}/>
    <Route path='showDownload/:id' component={FrontShowDownload}/>
    <Route path='pictureList' component={FrontPictureList}/>
    <Route path='showPicture/:id' component={FrontShowPicture}/>
    <Route path='productList' component={FrontProductList}/>
    <Route path='showProduct/:id' component={FrontShowProduct}/>
    <Route path='showSummary/:id' component={FrontShowSummary}/>
  </Route>

  <Route path='admin/login' component={Login} />
  <Route path='admin' component={Admin}>
    <Route onEnter={needLogin.enter} >
      <IndexRoute component={Home} />
      <Route path='release' component={Release} onLeave={needLogin.leave}/>
      <Route path='manage(/:id)' component={Manage} onLeave={needLogin.leave}/>

      <Route path='summaryList' component={SummaryList} onLeave={needLogin.leave}/>
      <Route path='saveSummary(/:id)' component={SummarySave} onLeave={needLogin.leave}/>
      <Route path='articleList' component={ArticleList} onLeave={needLogin.leave}/>
      <Route path='saveArticle(/:id)' component={ArticleSave} onLeave={needLogin.leave}/>
      <Route path='productList' component={ProductList} onLeave={needLogin.leave}/>
      <Route path='saveProduct(/:id)' component={ProductSave} onLeave={needLogin.leave}/>
      <Route path='downloadList' component={DownloadList} onLeave={needLogin.leave}/>
      <Route path='saveDownload(/:id)' component={DownloadSave} onLeave={needLogin.leave}/>
      <Route path='pictureList' component={PictureList} onLeave={needLogin.leave}/>
      <Route path='savePicture(/:id)' component={PictureSave} onLeave={needLogin.leave}/>

      <Route path='resourceList' component={ResourceList} onLeave={needLogin.leave}/>
      <Route path='userGroupList' component={UserGroupList} onLeave={needLogin.leave}/>
      <Route path='UserList' component={UserList} onLeave={needLogin.leave}/>
      <Route path='website' component={Website} onLeave={needLogin.leave}/>

      <Route path='column' component={Column} onLeave={needLogin.leave}/>
    </Route>
  </Route>
  <Route path='*' component={NotFound} />
</Route>;

export default routes;