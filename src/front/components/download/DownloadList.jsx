import React, { Component } from 'react';
import { Pagination, Layout } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './DownloadList.css';

class DownloadList extends Component {
  
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
  }

  componentDidMount(){
    this.props.downloadList(this.props.location.search);
    this.props.frontInit([`?type=column&id=${this.props.location.query.column || ''}`, '下载列表']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.query.column !== this.props.location.query.column) {
      this.searchParams = new URLSearchParams('?column=' + nextProps.location.query.column);
      this.props.downloadList('?' + this.searchParams.toString());
      this.props.frontInit([`?type=column&id=${nextProps.location.query.column || ''}`, '下载列表']);
    }
  }

  render() {
    const { data, total, currentPage } = this.props;
    const { handlePage } = this.props;

    return (
      <div className="front-downloadList">
        {this.renderDownloadList(data)}
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

  renderDownloadList(data) {
    const downloadList = data.map((el, i) => 
      <Layout.Col key={i}>
        <div className="downloadList-title">
          <Link to={`/showDownload/${el._id}`}>{el.title}</Link>
        </div>
        <div className="downloadList-info">
          <div><Link to={`/showDownload/${el._id}`}>查看详细</Link></div>
          <span><b>文件个数</b>：{el.filesCount}</span>
          <span><b>点击次数</b>：{el.pv}</span>
          <span><b>创建时间</b>：{el.createAt}</span>
        </div>
      </Layout.Col>
    )

    return <Layout.Row>{downloadList}</Layout.Row>
  }

}

export default DownloadList;