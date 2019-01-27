import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { DropArea } from './uploadForm.styles';


const uploadFileMutation = gql`
  mutation($file: Upload!, $userId: String!) {
    uploadFile(file: $file, userId: $userId)
  }
`;

const helloQuery = gql`
  query{
    hello 
  }
`;

class UploadForm extends Component {
  render() {
    const { userId } = this.props;
    return (
      <div>
        <Query query={helloQuery}>
          {(query) => {
            const { loading, error, data } = query;
            if (loading) return '...loading';
            if (error) return 'error';
            const { hello } = data;
            return (
              <div>{hello}</div>
            );
          }}
        </Query>

        <Mutation mutation={uploadFileMutation}>
          {mutate => (
            <Dropzone onDrop={([file]) => mutate({ variables: { file, userId } })}>
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
          )}
        </Mutation>
      </div>
    );
  }
}
export default UploadForm;
