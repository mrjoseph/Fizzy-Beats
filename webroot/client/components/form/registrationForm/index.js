import { compose, graphql } from 'react-apollo';
import { ADD_USER_MUTATION } from '../../../graphql/queries/queries';
import { withRouter } from 'react-router';
import RegisterForm from './RegisterForm';

export default compose(
  graphql(ADD_USER_MUTATION, { name: 'addUser' }),
)(withRouter(RegisterForm));
