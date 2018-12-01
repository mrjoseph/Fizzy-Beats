import { compose, graphql } from 'react-apollo';
import { ADD_USER_MUTATION } from '../../../graphql/queries/queries';
import RegisterForm from './RegisterForm';

export default compose(
  graphql(ADD_USER_MUTATION, { name: 'addUser' }),
)(RegisterForm);
