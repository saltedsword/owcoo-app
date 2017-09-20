import React, { Component } from 'react';
import { Carousel } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './ShowPicture.css';

class ShowPicture extends Component {

  componentDidMount(){
    this.props.showPicture(this.props.params.id);
    this.props.frontInit([`?type=picture&id=${this.props.params.id || ''}`, '图片详情']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.showPicture(nextProps.params.id);
      this.props.frontInit([`?type=picture&id=${nextProps.params.id || ''}`, '图片详情']);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.pictureContent.innerHTML = this.props.picture.content;
  }

  render() {
    const { picture, pre, next } = this.props;

    return (
      <div className="front-showPicture">
        <h1 className="front-show-title">{picture.title}</h1>
        <div className="demo-4 medium">
          <Carousel autoplay={false} type="flatcard">
            {
              picture.subImgs.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <h3><img src={item.url} style={{width:'300px', height:"300px"}} alt={picture.title}/></h3>
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </div>
        <h3 className="front-show-ctitle"><span>详细描述</span></h3>
        <div className="front-show-editor">
          <div ref="pictureContent"></div>
        </div>
        <div className="front-show-tools">
          <ul className="front-show-page">
            <li><span>上一条</span>{pre ? <Link to={`/showPicture/${pre._id}`}>{pre.title}</Link> : '没有了'}</li>
            <li><span>下一条</span>{next ? <Link to={`/showPicture/${next._id}`}>{next.title}</Link> : '没有了'}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowPicture;