import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import './RichEditor.css';
/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends Component {

  render () {
    return (
      <div>
        <ReactQuill 
          theme={'snow'}
          onChange={v => this.props.onChange && this.props.onChange(v)}
          value={this.props.value}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
         />
       </div>
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    [{align: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size', 'align',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


/* 
 * Render component on page
 */
export default Editor;