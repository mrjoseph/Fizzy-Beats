import React from 'react';
import HeaderNav from '../header-hav/HeaderNav';
import logo from './images/fizzy-logo-black.svg';
function Header({ history, data }) {
  return (
    <header>
      <HeaderNav history={history} data={data} logo={logo} />
    </header>
  );
}

export default Header;

