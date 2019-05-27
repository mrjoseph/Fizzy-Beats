import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router';
import moment from 'moment';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { DropArea } from '../uploadForm/uploadForm.styles';
import classNames from 'classname';
import { UploaderImage, Image, PreviewItemsUl, UploadForm } from './uploader.styles';
import Images from '../../images/images';
import { UPLOADER } from '../formConfig/formConfig';

import { SubmitButton } from '../submitButton/SubmitButton';


const PreviewItems = ({ items }) => {
  return(
  <ol className="list-group">
    {  
        items.map(({ item, name, size }) => {       
            if(item.match(/data\:audio\/mp3/g) !== null && item.match(/data\:audio\/mp3/g)[0] === 'data:audio/mp3'){
           return(
            <li key={item} className="list-group-item">
            <div className="text-secondary">{name}</div>
            <div><strong>Size:</strong>{size}</div>
              {/* <audio key={item} controls>
                <source src={item} type="audio/mpeg" />
              </audio> */}
            </li>
              )
            }
           if(item.match(/data\:image\/jpeg/g)[0] !== null && item.match(/data\:image\/jpeg/g)[0] === 'data:image/jpeg'){
              return (
                <li key={item} className="list-group-item">
                   <Image src={item} alt="" />
                </li>
              )
           }
        })
    }
  </ol>)
}

class Upload extends Component {
  constructor(props){
    super();
    this.state = {
      name: '',
      file: null,
      images: [],
      formErrors: {}
    };
  }


  onDrop = async (e) => {
    const { files } = e.target;
    
    this.setState({ file: files });   
    this.setState({ successMessage: null})
    Object.keys(files).forEach((item) => {
      
      const reader = new FileReader();
      reader.readAsDataURL(files[item]);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => { 
          const currentState = this.state.images;
         const result = [{
           item: reader.result,
           name: files[item].name,
           size: files[item].size,
          }, ...currentState]
         this.setState({images: result});
      }
    }); 
  };


  uploadAssets = async (fileList, signedRequest, userId) => {
    const data = new FormData();
    Object.keys(fileList).forEach((item) => { data.append('files', fileList[item]); })
    data.append('userId', userId);
    const options = {
      method: 'POST',
      body: data
    };
    try {
      const response = await fetch(signedRequest, options);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  submit = async (e) => {
    e.preventDefault();
    const { file } = this.state;
    if(!file) return;
    const { history } = this.props;
    const url = 'http://localhost:3003/upload';
    await this.uploadAssets(file, url,this.props.userId);
    const files = Object.keys(file).map((item) => {
      return { 
        name: file[item].name, 
        size:file[item].size, 
        type:file[item].type 
      }
    });
    
    const res = await this.props.addAssets({
        variables: {
          files: files,
          userId: this.props.userId,
        },
      });
      this.setState({
        successMessage: res.data.addAssets.message,
        images: null,
        file: null,
        formErrors: {},
      });
  };
  submitDisabled = () => { return false}
  handleBlur = () => {}
  render() {
    const { formErrors, status } = this.state;
    return (
      <div>
        <UploadForm id="form" onSubmit={this.submit} className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Upload your tracks</h5>
        </div>
        <div className="modal-body">
        {UPLOADER.map(elements => elements.map((props) => {
            const { Components, ...rest } = props;
            return (
              <Components
                formErrors={formErrors}
                key={props.name}
                onChange={this.onDrop}
                handleBlur={this.handleBlur}
                {...rest}
              />
            );
          }))}
          <div className="modal-body">
          {this.state.successMessage ?
        <div>
          {this.state.successMessage}
          </div> : <div>
          {this.state.images && <PreviewItems items={this.state.images} />}
          </div>}
          </div>
        </div>    
        <div className="modal-footer">
        <SubmitButton submitDisabled={this.submitDisabled}>
          Upload audio files
          </ SubmitButton>
        </div>     
        </UploadForm>
        <hr />
        <Images userId={this.props.userId}/>
      </div>
    );
  }
}

const addAssetsMutation = gql`
  mutation($files: [File]!, $userId: String!) {
    addAssets(files: $files, userId: $userId) {
      message
    }
  }
`;



export default withRouter(compose(
  graphql(addAssetsMutation, { name: 'addAssets' }),
)(Upload));
