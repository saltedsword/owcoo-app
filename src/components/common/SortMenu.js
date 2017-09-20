import React, { Component } from 'react';
import { Dropdown, Button } from 'element-react';
import 'element-theme-default';
// import './SortMenu.css';


class SortMenu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedName: '',
      className: this.props.className,
      sortOptions: this.props.sortOptions,
      onCommand: this.props.onCommand
    }
  }

  handleSort(command, dropdownItem) {
    this.setState({ selectedName: dropdownItem.props.children });
    this.state.onCommand && this.state.onCommand(command);
  }

  render() {
      return (
        <Dropdown className={this.state.className} onCommand={this.handleSort.bind(this)} menu={(
          <Dropdown.Menu>
            {
              this.state.sortOptions.map((item, index) => {
                return <Dropdown.Item key={index} command={item.value}>{item.text}</Dropdown.Item>
              })
            }
          </Dropdown.Menu> )}>
          <Button type="primary">
            {this.state.selectedName || '默认排序'}<i className="el-icon-caret-bottom el-icon--right"></i>
          </Button>
        </Dropdown>
    )
  }
}

export default SortMenu;