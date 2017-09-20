import React, { Component } from 'react';
import { Select } from 'element-react';
import 'element-theme-default';
import './Cascader.css';


class Cascader extends Component {
  
  constructor(props) {
    super(props);
    this.initData(props);
  }

  initData(props) {
    this.options = props.options;
    this.selectedOptions = props.value;
    this.onChange = props.onChange;
    this.selections = [];
    this.readOnly = props.readOnly || false;
  }

  componentWillUpdate(nextProps, nextState){
    this.initData(nextProps);
    this.initOptions();
  }

  initOptions() {
    let p = this.options;
    this.selectedOptions.forEach((key, index) => {

      if (!index) return this.selections.push(p);

      for(let i=0; i<p.length; i++) {
        if (p[i].value === this.selectedOptions[index-1]) {
          p = p[i].children;
          this.selections.push(p);
          break;
        }
      }
    });

    for(let i=0; i<p.length; i++) {
      if (p[i].value === this.selectedOptions[this.selectedOptions.length-1]) {
        p[i].children && this.selections.push(p[i].children);
        break;
      }
    }
  }

  handleChange(index, value) {
    this.selectedOptions.splice(index, this.selectedOptions.length, value);
    this.onChange(value, this.selectedOptions);
  }

  render() {
      return (
        <div>

          {
            this.selections.map((item, index) => {
              return <Select
                key={index}
                className="cascader-column-select" 
                value={this.selectedOptions[index]}
                disabled={this.readOnly}
                onChange={ this.handleChange.bind(this, index) }>
              {
                item.map(el => {
                  return <Select.Option key={el.value} label={el.label} value={el.value} />
                })
              }
              </Select>
            })
          }
        </div>
    )
  }
}

export default Cascader;