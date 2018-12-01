import { compose, graphql } from 'react-apollo';
import { ADD_USER_MUTATION } from '../../../graphql/queries/queries';
import LoginForm from './LoginForm';

// export default compose(
//   graphql(ADD_USER_MUTATION, { name: 'addUser' }),
// )(LoginForm);

export default LoginForm;
