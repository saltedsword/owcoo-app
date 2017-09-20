import React, { Component } from 'react';
import { Pagination, Layout } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './ArticleList.css';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
  }

  componentDidMount(){
    this.props.articleList(this.props.location.search);
    this.props.frontInit([`?type=column&id=${this.props.location.query.column || ''}`, '文章列表']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.query.column !== this.props.location.query.column) {
      this.searchParams = new URLSearchParams('?column=' + nextProps.location.query.column);
      this.props.articleList('?' + this.searchParams.toString());
      this.props.frontInit([`?type=column&id=${nextProps.location.query.column || ''}`, '文章列表']);
    }
  }

  render() {
    const { data, total, currentPage } = this.props;
    const { handlePage } = this.props;

    return (
      <div className="front-articleList">
        {this.renderArticleList(data)}
        <div className="front-pagination">
          <Pagination 
            layout="total, prev, pager, next, jumper" 
            total={total} 
            pageSize={10} 
            currentPage={currentPage}
            onCurrentChange={currentPage => handlePage(currentPage, this.searchParams)}/>
        </div>
      </div>
    )
  }

  renderArticleList(data) {
    const articleList = data.map((el, i) => 
    <Layout.Col key={i}>
      <div>
        <span className="articleTitle"><Link to={`/showArticle/${el._id}`}><i className="fa fa-file-text-o" />{el.title}</Link></span>
        <span className="articleTime">{el.createAt}</span>
      </div>
    </Layout.Col>

    )

    return <Layout.Row>{articleList}</Layout.Row>
  }
}

export default ArticleList;