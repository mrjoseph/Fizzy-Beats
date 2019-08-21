import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import Upload from './s3Uploader';

const addAssetsMutation = gql`
  mutation($file: [File]!, $userId: String!) {
    addAssets(file: $file, userId: $userId) {
      message
    }
  }
`;

export default withRouter(compose(
  graphql(addAssetsMutation, { name: 'addAssets' }),
)(Upload));
