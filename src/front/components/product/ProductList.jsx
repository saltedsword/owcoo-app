import React, { Component } from 'react';
import { Pagination, Layout, Card, Button } from 'element-react';
import 'element-theme-default';
import { Link } from 'react-router';
import './ProductList.css';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
    this.searchParams.set('pSize', 9);
  }

  componentDidMount(){
    const searchString = '?' + this.searchParams.toString();
    this.props.productList(searchString);
    this.props.frontInit([`?type=column&id=${this.props.location.query.column || ''}`, '产品列表']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.query.column !== this.props.location.query.column) {
      this.searchParams = new URLSearchParams('?pSize=9&column=' + nextProps.location.query.column);
      this.props.productList('?' + this.searchParams.toString());
      this.props.frontInit([`?type=column&id=${nextProps.location.query.column || ''}`, '产品列表']);
    }
  }

  render() {
    const { data, total, currentPage } = this.props;
    const { handlePage } = this.props;
    return (
      <div className="front-productList">
        {this.renderProductList(data)}
        <div className="front-pagination">
          <Pagination 
            layout="total, prev, pager, next, jumper" 
            total={total} 
            pageSize={9} 
            currentPage={currentPage}
            onCurrentChange={currentPage => handlePage(currentPage, this.searchParams)}/>
        </div>
      </div>
    )
  }

  renderProductList(data) {
    const productList = data.map((el, i) => 
    <Layout.Col xs="24" sm="12" md="8" lg="8" key={i}>
      <Card bodyStyle={{ padding: 0 }}>
        <Link to={`/showProduct/${el._id}`}><img src={el.subImgs[0] ? el.subImgs[0].url : ''} alt={el.title} /></Link>
        <div style={{ padding: 14 }}>
          <span className="proTitle">{el.title}</span>
          <div className="bottom clearfix">
            <time className="time">{`参考价：￥ ${el.price}`}</time>
            <Link to={`/showProduct/${el._id}`}><Button type="text" className="button">产品详情</Button></Link>
          </div>
        </div>
      </Card>
    </Layout.Col>
    )

    return <Layout.Row gutter="10">{productList}</Layout.Row>
  }

}

export default ProductList;