import React, { Component } from 'react';

class ShowSummary extends Component {
  componentDidMount(){
    this.props.showSummary(this.props.params.id);
    this.props.frontInit([`?type=column&id=${this.props.params.id || ''}`, '简介详情']);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.showSummary(nextProps.params.id);
      this.props.frontInit([`?type=column&id=${nextProps.params.id || ''}`, '简介详情']);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.summaryContent.innerHTML = this.props.summary.content;
  }

  render() {
    const { summary } = this.props;
    return (
      <div className="front-showSummary">
        <h1 className="front-show-title">{summary.column.name}</h1>
        
        <div className="front-show-editor">
          <div ref="summaryContent"></div>
        </div>        
      </div>
    )
  }
}

export default ShowSummary;