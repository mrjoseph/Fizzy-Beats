import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';


export default withApollo(withRouter(LoginForm));
