import React, { Component } from 'react';
import { Pagination, Layout } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './PictureList.css';

class PictureList extends Component {
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
  }

  componentDidMount(){
    this.props.pictureList(this.props.location.search);
    this.props.frontInit([`?type=column&id=${this.props.location.query.column || ''}`, '图片列表']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.query.column !== this.props.location.query.column) {
      this.searchParams = new URLSearchParams('?column=' + nextProps.location.query.column);
      this.props.pictureList('?' + this.searchParams.toString());
      this.props.frontInit([`?type=column&id=${nextProps.location.query.column || ''}`, '图片列表']);
    }
  }
  
  render() {
    const { data, total, currentPage } = this.props;
    const { handlePage } = this.props;
    return (
      <div>
        {this.renderPictureList(data)}
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

  renderPictureList(data) {
    const pictureList = data.map((el, i) => 
    <div className="picture-item" key={i}>
      <Layout.Row>
        <Layout.Col xs="24" sm="24" md="7" lg="7">
          <div className="mainImg"><Link to={`/showPicture/${el._id}`}><img src={el.subImgs[0] ? el.subImgs[0].url : ''} alt={el.title} /></Link></div>
        </Layout.Col>
        <Layout.Col xs="0" sm="0" md="17" lg="17" className="description">
          <div className="title"><h2><Link to={`/showPicture/${el._id}`}>{el.title}</Link></h2> 
            <ul className="post-meta">
              <li>
                <i aria-hidden="true" className="fa fa-clock-o"></i>
                &nbsp;&nbsp;{el.createAt}
              </li> 
              <li>
                <i aria-hidden="true" className="fa fa-eye"></i>&nbsp;&nbsp;{el.pv}
              </li> 
            </ul>
          </div>
          <div className="des">{el.abstract}</div>
        </Layout.Col>
      </Layout.Row>
    </div>
    )

    return <div>{pictureList}</div>
  }
}
     
export default PictureList;