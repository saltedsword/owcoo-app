import React, { Component } from 'react';
import { Link } from 'react-router';
import './ShowArticle.css';

class ShowArticle extends Component {

  componentDidMount(){
    this.props.showArticle(this.props.params.id);
    this.props.frontInit([`?type=article&id=${this.props.params.id || ''}`, '文章详情']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.showArticle(nextProps.params.id);
      this.props.frontInit([`?type=article&id=${nextProps.params.id || ''}`, '文章详情']);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.articleContent.innerHTML = this.props.article.content;
  }

  render() {
    const { article, pre, next } = this.props;

    return (
      <div className="front-showArticle">
        <h1 className="front-show-title">{article.title}</h1>
        <div className="article-infos">
          <span className="article-time">发布时间: {article.createAt}</span>
          <span className="article-hits">阅读: <span className="article-Clicks">{article.pv}</span></span>
        </div>
        <div className="front-show-editor">
          <div ref="articleContent"></div>
        </div>
        <div className="front-show-tools">
          <ul className="front-show-page">
            <li><span>上一条</span>{pre ? <Link to={`/showArticle/${pre._id}`}>{pre.title}</Link> : '没有了'}</li>
            <li><span>下一条</span>{next ? <Link to={`/showArticle/${next._id}`}>{next.title}</Link> : '没有了'}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowArticle;