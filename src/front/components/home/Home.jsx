import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { Carousel, Button, Layout, Card } from 'element-react';
import 'element-theme-default';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import FrontHeader from '../layout/FrontHeader';
import FrontFooter from '../layout/FrontFooter';
import DocumentMeta from 'react-document-meta';

class Home extends Component {

  componentDidMount(){
    this.props.frontHomeInit();
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.aboutUsContent.innerHTML = this.props.aboutUs.content;
  }

  render() {
    const { banner, aboutUs, articles, moreArticles, products, moreProducts, pictures, morePictures } = this.props;
    const { meta } = this.props;
    
    return (
    	<DocumentMeta {...meta}>
      <div className="front-home" >
	    	<FrontHeader />
	    	<div className="front-banner">
	    		{this.renderBanner(banner)}
	    	</div>
	    	
	    	<div className="front-index-item">
	    		<div className="index-innerWrap">
	    			<h3 className="front-index-title">
							<span>
								关于我们
							</span>
						</h3>
						<div className="front-index-about-cont">
							{this.renderAboutUs(aboutUs)}
						</div>
	    		</div>
	    	</div>

	    	<div className="front-index-item front-index-item-two">
	    		<div className="index-innerWrap">
	    			<h3 className="front-index-title">
							<span>
								推荐产品
							</span>
						</h3>
						<div className="front-index-product-cont">
							{this.rednerProducts(products)}
							<h4><Link to={`/productList?column=${moreProducts}`}><Button type="danger" className="about-more">了解更多产品</Button></Link></h4>
						</div>
	    		</div>
	    	</div>

	    	<div className="front-index-item">
	    		<div className="index-innerWrap">
	    			<h3 className="front-index-title">
							<span>
								文章列表
							</span>
						</h3>
						<div className="front-index-article-cont">
							{this.renderArticles(articles)}
							<h4><Link to={`/articleList?column=${moreArticles}`}><Button type="danger" className="about-more">浏览更多文章</Button></Link></h4>
						</div>
	    		</div>
	    	</div>

	    	<div className="front-index-item front-index-item-two">
	    		<div className="index-innerWrap">
	    			<h3 className="front-index-title">
							<span>
								图文列表
							</span>
						</h3>
						<div className="front-index-picture-cont">
							{this.renderPictures(pictures)}
							<h4><Link to={`/pictureList?column=${morePictures}`}><Button type="danger" className="about-more">浏览更多图文</Button></Link></h4>
						</div>
	    		</div>
	    	</div>

	    	<FrontFooter />
      </div>
      </DocumentMeta>
    );
  }

  renderBanner(banner) {
  	return <Carousel autoplay={false} height="600px">
      {
        banner.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <h3><img src={item.url} alt="" style={{width: '100%', height: "600px"}}/></h3>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  }

  renderAboutUs(aboutUs) {
  	return <Layout.Row gutter="10">
      <Layout.Col xs="24" sm="12" md="12" lg="12" className="front-index-about-txt">
        <div className="about-txt-editor" >			
					<div ref="aboutUsContent"></div><br/>
					<br/>
					<Link to={`/showSummary/${aboutUs.id}`}><Button className="about-more">了解更多</Button></Link>		
				</div>
        		
      </Layout.Col>
      <Layout.Col xs="24" sm="12" md="12" lg="12" className="front-index-about-img">
        <Carousel autoplay={false}>
	        {
	          aboutUs.pic.map((item, index) => {
	            return (
	              <Carousel.Item key={index}>
	                <h3><img src={item.url} alt="" style={{width: '100%', height: "300px"}}/></h3>
	              </Carousel.Item>
	            )
	          })
	        }
	      </Carousel>
      </Layout.Col>
	  </Layout.Row> 
  }

  rednerProducts(products) {
  	return <Layout.Row gutter="10">
  		{
  			products.map((pro, i) =>
  			<Layout.Col xs="24" sm="12" md="8" lg="6" key={i}>
	        <Card bodyStyle={{ padding: 0 }}>
	          <Link to={`/showProduct/${pro._id}`}><img src={pro.img} alt={pro.title}/></Link>
	          <div style={{ padding: 14 }}>
	            <span className="proTitle">{pro.title}</span>
              <div className="bottom clearfix">
                <time className="time">{`参考价：￥ ${pro.price}`}</time>
                <Link to={`/showProduct/${pro._id}`}><Button type="text" className="button">产品详情</Button></Link>
              </div>
	          </div>
	        </Card>
	      </Layout.Col>
  		)}
   </Layout.Row>
  }

  renderArticles(articles) {
  	return <Layout.Row gutter="40">
  	{
  		articles.map((el, i) => 
  			<Layout.Col xs="24" sm="12" md="8" lg="8" key={i}>
		      <h3 className="article-cate"><Link to={`/articleList?column=${el._id}`}><span>{el.name}</span></Link></h3>
		      <ul>
		      	{
		      		el.articles.map((article, j) => 
		      			<li key={j}>
		      				<Link to={`/showArticle/${article._id}`} title={article.title}>{article.simpleTitle}</Link>
		      				<span>{article.date}</span>
		      			</li>
		      		)
		      	}
		       </ul>
		    </Layout.Col>
  		)
  	}
	  </Layout.Row>
  }

  renderPictures(pictures) {
  	return <Layout.Row gutter="40">
  	{
  		pictures.map((picture, i) => 
  			<Layout.Col xs="24" sm="12" md="12" lg="12" key={i}>
	        <div className="picture-item">
	          <Layout.Row>
	            <Layout.Col xs="24" sm="24" md="12" lg="12">
	              <div className="mainImg"><Link to={`/showPicture/${picture._id}`}><img src={picture.img} alt={picture.title} /></Link></div>
	            </Layout.Col>
	            <Layout.Col xs="0" sm="0" md="12" lg="12" className="description">
	              <div className="title"><h2><Link to={`/showPicture/${picture._id}`}>{picture.title}</Link></h2> 
                  <ul className="post-meta">
                    <li>
                      <i aria-hidden="true" className="fa fa-clock-o"></i>
                      &nbsp;&nbsp;{picture.date}
                    </li> 
                    <li>
                      <i aria-hidden="true" className="fa fa-eye"></i>&nbsp;&nbsp;{picture.pv}
                    </li> 
                  </ul>
                </div>
                <div className="des">{picture.abstract}</div>
	            </Layout.Col>
	          </Layout.Row>
	        </div>
	      </Layout.Col>
  		)
  	}
    </Layout.Row>
  }
}

export default Home;
