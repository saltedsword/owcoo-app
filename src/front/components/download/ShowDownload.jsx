import React, { Component } from 'react';
import { Link } from 'react-router';
import './ShowDownload.css';
import 'font-awesome/css/font-awesome.min.css';

class ShowDownload extends Component {
  
  componentDidMount(){
    this.props.showDownload(this.props.params.id);
    this.props.frontInit([`?type=download&id=${this.props.params.id || ''}`, '下载详情']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.showDownload(nextProps.params.id);
      this.props.frontInit([`?type=download&id=${nextProps.params.id || ''}`, '下载详情']);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this.refs.downloadContent.innerHTML = this.props.download.content;
  }

  render() {
    const { download, pre, next } = this.props;
    return (
      <div className="front-showDownload">
        <h1 className="front-show-title">{download.title}</h1>
        <ul className="paralist">
          <li><span>创建时间</span>{download.createAt}</li>

          <li><span>文件版本</span>{download.version}</li>

          <li><span>简要说明</span>{download.abstract}</li>

        </ul>
        <div className="downloadbox">
          <ul>
            {
              download.files.map((file, i) => 
                  <li key={i}>
                    <span className="fileName">
                      <a href={file.url} download={file.name}>{file.name}</a>
                    </span>
                    <span className="fileInof">
                      大小:{Math.round(file.size/1000)} KB 类型:{file.mimetype}
                    </span>
                    <span className="fileDownload">
                      <a href={file.url} download={file.name}>立即下载 <i className="fa fa-download" /></a>
                    </span>
                  </li>
                )
            }            
          </ul>
          
        </div>
        <h3 className="front-show-ctitle"><span>详细描述</span></h3>

        <div className="front-show-editor">
          <div ref="downloadContent"></div>
        </div>
        <div className="front-show-tools">
          <ul className="front-show-page">
            <li><span>上一条</span>{pre ? <Link to={`/showDownload/${pre._id}`}>{pre.title}</Link> : '没有了'}</li>
            <li><span>下一条</span>{next ? <Link to={`/showDownload/${next._id}`}>{next.title}</Link> : '没有了'}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowDownload;