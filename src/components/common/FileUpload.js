import React, { Component } from 'react';
import { Upload, Dialog, Button } from 'element-react';
import 'element-theme-default';
import './FileUpload.css';
import CONFIG from '../../config';


class FileUpload extends Component {
  
  constructor(props) {
    super(props);
      const { files, className, action, type } = this.props;

      this.state = {
        dialogImageUrl: '',
        dialogVisible: false,
        files: files,
        className: className || '',
        action: action || `${CONFIG.BASE_URL}uploadForElement`,
        listType: type === 'picture' ? 'picture-card' : !type ? 'text' : type,
        flag: true,
      };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.flag) {
      this.setState({ flag: false, files: nextProps.files });
    }
  }

  render() {
    const { dialogImageUrl, dialogVisible, files, action, listType } = this.state;

    return this.state.flag ? null :
    (
      listType === 'avatar' ? 
      <Upload
        className="avatar-uploader"
        action={action}
        showFileList={false}
        onSuccess={res => {files[0] = res.data; this.forceUpdate(); this.props.onChange && this.props.onChange(files)}}
      >
        { files && files[0] ? <img src={files[0].url} className="avatar" alt=""/> : <i className="el-icon-plus avatar-uploader-icon"></i> }
      </Upload>
      :
      <div className={this.state.className}>
        <Upload
          action={action}
          listType={listType}
          fileList={files}
          onSuccess={res => {files.push(res.data); this.props.onChange && this.props.onChange(files)}}
          onPreview={file => this.handlePictureCardPreview(file)}
          onRemove={(file, fileList) => this.handleRemove(file, fileList)}
        >
        {
          listType === 'picture-card' ? <i className="el-icon-plus"></i> : <Button size="small" type="primary">点击上传</Button>
        }
        </Upload>
        {
          listType && <Dialog
            visible={dialogVisible}
            size="small"
            onCancel={() => this.setState({ dialogVisible: false })}
          >
            <img width="100%" src={dialogImageUrl} alt="" />
          </Dialog>
        }
      </div>
    )
  }

  handleRemove(file, fileList) {
    if (file.raw && file.status !== 'success') return;
    const url = file.raw ? file.response.data.url : file.url;
    const { files } = this.state;
    for (let i=0; i<files.length; i++) {
      if (files[i].url === url) {
        files.splice(i, 1);
        this.props.onChange && this.props.onChange(files)
        break;
      }
    }
  }

  handlePictureCardPreview(file) {
    this.setState({
      dialogImageUrl: file.url,
      dialogVisible: true,
    })
  }
}

export default FileUpload;