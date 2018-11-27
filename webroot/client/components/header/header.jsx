import React from 'react';
import HeaderNav from '../header-hav/HeaderNav';

function Header({ history }) {
  return (
    <header>
      <HeaderNav history={history} />
    </header>
  );
}

export default Header;

