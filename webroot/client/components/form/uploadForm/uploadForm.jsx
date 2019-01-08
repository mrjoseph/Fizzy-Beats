import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

class UploadForm extends Component {
  render() {
    const { userId } = this.props;
    return (
      <Mutation mutation={uploadFileMutation}>
        {mutate => (
          <Dropzone onDrop={([file]) => mutate({ variables: { file, userId } })}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
              >
                <input {...getInputProps()} />
                {
                        isDragActive
                          ? <p>Drop files here...</p>
                          : <p>Try dropping some files here, or click to select files to upload.</p>
                      }
              </div>
            )}
          </Dropzone>
        )}
      </Mutation>
    );
  }
}
export default UploadForm;
