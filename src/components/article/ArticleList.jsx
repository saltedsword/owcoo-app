import React, { Component } from 'react';
import { Button, Table, Pagination, Tag, Input, Notification } from 'element-react';
import { Cascader, SortMenu } from '../common';
import 'element-theme-default';
import { Link } from 'react-router';
import './ArticleList.css';


class ArticleList extends Component {
  
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
    this.columns = [
      {
        type: 'selection'
      },
      {
        label: "标题",
        prop: "title",
        width: 240
      },
      {
        label: "创建时间",
        prop: "createAt",
        width: 200,
      },
      {
        label: "所属栏目",
        prop: "column",
        width: 140,
      },
      {
        label: "状态",
        prop: "status",
        width: 160,
        render: data => {
          switch (data.status) {
            case 1: return <Tag className="tag-text" type="primary">推荐</Tag>;
            case 2: return <Tag className="tag-text" type="success">置顶</Tag>;
            case 3: return [<Tag className="tag-text" key="1" type="primary">推荐</Tag>, <Tag className="tag-text" key="2" type="success">置顶</Tag>];
            default:
          }
        }
      },
      {
        label: "访问量",
        prop: "pv",
        width: 80,
      },
      {
        label: "创建人",
        prop: "creater",
        width: 100,
      },
      {
        label: "操作",
        prop: "operation",
        width: 200,
        fixed: 'right',
        render: data => {
          return (
            <div>
              <Link to={`/admin/saveArticle/${data._id}`}><Button plain={true} type="info" size="small">编辑</Button></Link>
              <Button type="danger" size="small" onClick={ e => this.props.handleDel(data._id)}  style={{marginLeft: '10px'}}>删除</Button>
            </div>
          )
        }
      }
    ];
    this.sortOptions = [{text: '默认排序', value: ''}, {text: '点击最高', value: 'pv_desc'}, {text: '时间最早', value: 'createAt_asc'}, {text: '时间最近', value: 'createAt_desc'}];
  }
  
  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '文章列表'}]);
    this.props.articleList(this.props.location.search);
  }

  shouldComponentUpdate(nextProps){
    const { status, msg, deleted } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return !(deleted && this.props.articleList('?' + this.searchParams.toString()));
      default: return false;
    }
  }

  render() {
    const { selectedOptions, options, data, total, currentPage } = this.props;
    const { handleSort, handleSelect, handlePage, search } = this.props;

    return (
      <div>
        <div className="list-toolbar">
          <div className="add-button">
            <Link to="/admin/saveArticle"><Button type="danger">发布文章</Button></Link>
          </div>
          <div className="searchInput">                
            <Input
              ref="searchInput"
              icon="search"
              placeholder="请输入关键字"
              onKeyDown={e => {if(e.keyCode === 13) search(this.refs.searchInput, this.searchParams)}}
              onIconClick={() => search(this.refs.searchInput, this.searchParams)}
            />
          </div>
          <div className="sortMenu">
            <SortMenu onCommand={c => handleSort(c, this.searchParams)} sortOptions={ this.sortOptions } />
          </div>
          <div className="cascader">
            <Cascader
              options={options} 
              value={selectedOptions} 
              onChange={ v => handleSelect(v, this.searchParams) } />
          </div>
        </div>

        <div>
          <Table
              style={{width: '100%'}}
              columns={this.columns}
              data={data}
            />
          <div className="pagination">
            <Pagination 
              layout="total, prev, pager, next, jumper" 
              total={total} 
              pageSize={10} 
              currentPage={currentPage}
              onCurrentChange={currentPage => handlePage(currentPage, this.searchParams)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleList;