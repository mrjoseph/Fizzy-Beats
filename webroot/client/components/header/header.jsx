import React from 'react';
import HeaderNav from '../header-hav/HeaderNav';

const Header = ({ history, data, ...rest })  => <HeaderNav history={history} data={data} {...rest} />

export default Header;

