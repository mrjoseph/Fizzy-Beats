import React, { Component } from 'react';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import Cropper from 'react-cropper';
import { UploaderImage, Image, PreviewItemsUl, UploadForm, BackgroundImageContainer } from './uploader.styles';
import Images from '../../images/images';
import { UPLOADER_IMAGE_UPLOAD, UPLOADER_DETAILS } from '../formConfig/formConfig';
import { GET_USERS_QUERY } from '../../../graphql/queries/queries';
import { SubmitButton } from '../submitButton/SubmitButton';
import '../../../../../node_modules/cropperjs/dist/cropper.css';
const spinner = require('../../../assets/images/rings.svg');

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

var blob = new Blob(byteArrays, {type: contentType});
return blob;
}



class ImageUploader extends Component {
  constructor(props){
    super();
    this.state = {
      loadingPreview: false,
      name: '',
      file: null,
      croppedImage: '',
      images: [],
      formErrors: {}
    };
  }


  onDrop = async (e) => {
    const { files } = e.target;
    this.setState({ loadingPreview: true }); 
    this.setState({ file: files });   
    this.setState({ successMessage: null})
    Object.keys(files).forEach((item) => {
      
      const reader = new FileReader();
      
      reader.readAsDataURL(files[item]);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => { 
        
         const result = [{
           item: reader.result,
           name: files[item].name,
           size: files[item].size,
          }]
         this.setState({images: result});
         this.setState({ loadingPreview: false }); 
      }
      FileReader.onprogress = () => {
        console.log('asdasd')
      }
    }); 
  };


  uploadAssets = async (fileList, signedRequest, userId) => {
    const data = new FormData();
    Object.keys(fileList).forEach((item) => { data.append('files', fileList[item], this.state.file[0].name); })
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
  cancelUpload = (e) => {
    e.preventDefault();
    this.setState({images: []});
  }

  submit = async (e) => {
    e.preventDefault();
    const { file, croppedImage } = this.state;
    if(!croppedImage) return;


    // Split the base64 string in data and contentType
    var block = croppedImage.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    const url = 'http://localhost:3003/upload';

    await this.uploadAssets([blob], url,this.props.userId);
    const files = Object.keys(file).map((item) => {
      return { 
        name: file[item].name, 
        size:file[item].size, 
        type:file[item].type 
      }
    });
    
    const res = await this.props.addAssets({
        variables: {
          file: files,
          userId: this.props.userId,
        },
        options: (props) => {
          console.log('do something');
        }
      });
      this.setState({
        successMessage: res.data.addImage.message,
        images: null,
        file: null,
        formErrors: {},
      });
      this.props.refetch();
  };
  submitDisabled = () => { return false}
  handleBlur = () => {}
  _crop(){
    this.setState({ croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()})
  }
  render() {
    const { formErrors } = this.state;
    const { profileImage, userId } = this.props;
    const backgroundImage = `url(http://localhost:3003/static/${userId}${profileImage})`
    return (
      <div>
        <UploadForm id="form" onSubmit={this.submit}>
        {this.state.successMessage &&<div>{this.state.successMessage}</div>}
        {this.state.images !== null && this.state.images.length >= 1 ? 
          <BackgroundImageContainer className="modal-body">
          
          <Cropper
            ref='cropper'
            src={this.state.images[0].item}
            style={{height: 300, width: 300}}
            aspectRatio={1/1}
            guides={false}
            crop={this._crop.bind(this)} 
            />
            </BackgroundImageContainer>
          : <BackgroundImageContainer className="modal-body" style={{backgroundImage: backgroundImage}}>
          {UPLOADER_IMAGE_UPLOAD.map(elements => elements.map((props) => {
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
        </BackgroundImageContainer>
      }
        <div className="modal-footer">
        {this.state.images !== null && this.state.images.length === 1 &&
          <button onClick={this.cancelUpload}>
            cancel
          </ button>
        }
        <SubmitButton submitDisabled={this.submitDisabled}>Add image</ SubmitButton>
        </div>     
        </UploadForm>
        <hr />
      </div>
    );
  }
}

const addAssetsMutation = gql`
  mutation($file: [ImageFile]!, $userId: String!) {
    addImage(file: $file, userId: $userId) {
      message
    }
  }
`;



export default withRouter(compose(
  graphql(addAssetsMutation, { name: 'addAssets' }),
)(ImageUploader));
