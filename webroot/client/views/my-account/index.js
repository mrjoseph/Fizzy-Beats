import { withRouter } from 'react-router';
import withAuth from '../../AuthService/withAuth';
import MyAccount from './my-account';

export default withRouter(withAuth(MyAccount));