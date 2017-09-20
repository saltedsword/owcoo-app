import React, { Component } from 'react';
import { Button, Table, Pagination, Notification } from 'element-react';
import { Cascader } from '../common';
import 'element-theme-default';
import { Link } from 'react-router';


class SummaryList extends Component {
  
  constructor(props) {
    super(props);
    this.searchParams = new URLSearchParams(this.props.location.search);
    this.columns = [
      {
        type: 'selection'
      },
      {
        label: "所属栏目",
        prop: "column",
      },
      {
        label: "操作",
        prop: "operation",
        width: 200,
        fixed: 'right',
        render: data => {
          return (
            <div>
              <Link to={`/admin/saveSummary/${data._id}`}><Button plain={true} type="info" size="small">编辑</Button></Link>
            </div>
          )
        }
      }
    ];
  }
  
  componentDidMount(){
    this.props.headerInit([{name: '内容'}, {name: '管理', url: '/admin/manage'}, {name: '简介列表'}]);
    this.props.summaryList(this.props.location.search);
  }

  shouldComponentUpdate(nextProps){
    const { status, msg } = nextProps;
    switch(status) {
      case 'loading': /*Notification.info('loading...');*/ return false;
      case 'error': Notification.error(msg); return false;
      case 'success': return true;
      default: return false;
    }
  }

  render() {
    const { selectedOptions, options, data, total, currentPage } = this.props;
    const { handleSelect, handlePage } = this.props;

    return (
      <div>
        <div className="list-toolbar">
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

export default SummaryList;