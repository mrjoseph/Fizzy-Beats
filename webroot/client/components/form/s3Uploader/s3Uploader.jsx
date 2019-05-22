import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import moment from 'moment';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { DropArea } from '../uploadForm/uploadForm.styles';
import classNames from 'classname';
import { UploaderImage, Image, PreviewItemsUl } from './uploader.styles';


const PreviewItems = ({ items }) => {
  return(<PreviewItemsUl>
    {
        items.map(({ item }) => {
          if(item) {
            return (
              <UploaderImage key={item}>
                 <Image src={item} alt="" />
              </UploaderImage>
              )
          }
        })
    }
  </PreviewItemsUl>)
}

class Upload extends Component {
  constructor(props){
    super();
    this.state = {
      name: '',
      file: null,
      images: []
    };
  }


  onDrop = async (files) => {
    this.setState({ file: files });   
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => { 
        const currentState = this.state.images;
         const result = [{item: reader.result}, ...currentState]
         this.setState({images: result});
      }
    }); 
  };


  formatFilename = (filename) => {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  uploadAssets = async (fileList, signedRequest, userId) => {
    const data = new FormData();
    fileList.forEach((file) => { data.append('files', file); })
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

  submit = async () => {
    const { file } = this.state;
    const url = 'http://localhost:3003/upload';
    await this.uploadAssets(file, url,this.props.userId);
    const files = file.map(({name, size, type}) => ({ name, size, type }));
    const res = await this.props.addAssets({
        variables: {
          files: files,
          userId: this.props.userId,
        },
      });
      this.setState({successMessage: res.data.addAssets.message})
  };

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <DropArea
              {...getRootProps()}
              className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
            >
              <input {...getInputProps()} />
              {
                isDragActive
                  ? <p>Drop files here...</p>
                  : <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </DropArea>
          )}
        </Dropzone>
        {this.state.successMessage && <div> {this.state.successMessage}</div>}
        {this.state.images && <PreviewItems items={this.state.images} />}
       
        <button onClick={this.submit}>Submit</button>
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

export default compose(
  //graphql(CreateChampionMutation, { name: 'createChampion' }),
  graphql(addAssetsMutation, { name: 'addAssets' }),
)(Upload);
