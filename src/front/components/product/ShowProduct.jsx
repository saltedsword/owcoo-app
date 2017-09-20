import React, { Component } from 'react';
import { Carousel } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './ShowProduct.css';

class ShowProduct extends Component {
  componentDidMount(){
    this.props.showProduct(this.props.params.id);
    this.props.frontInit([`?type=product&id=${this.props.params.id || ''}`, '产品详情']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.showProduct(nextProps.params.id);
      this.props.frontInit([`?type=product&id=${nextProps.params.id || ''}`, '产品详情']);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.productContent.innerHTML = this.props.product.content;
  }

  render() {
    const { product, pre, next } = this.props;

    return (
      <div className="front-showProduct">
        <h1 className="front-show-title">{product.title}</h1>
        <div className="wPro">
          <div className="wpro_img">
            <Carousel autoplay={false}>
              {
                product.subImgs.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <h3><img src={item.url} style={{width:'300px', height:"300px"}} alt={product.title}/></h3>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>
          <div className="wpro_Ctn">
            <div className="wpro_price wborRadius">价格：¥{product.price}</div>
            <div className="wpro_int">{product.abstract}
             </div>
          </div>
        </div>
        
        <h3 className="front-show-ctitle"><span>详细描述</span></h3>
        <div className="front-show-editor">
          <div ref="productContent"></div>
        </div>
        <div className="front-show-tools">
          <ul className="front-show-page">
            <li><span>上一条</span>{pre ? <Link to={`/showProduct/${pre._id}`}>{pre.title}</Link> : '没有了'}</li>
            <li><span>下一条</span>{next ? <Link to={`/showProduct/${next._id}`}>{next.title}</Link> : '没有了'}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowProduct;