import React from 'react';
import HeaderNav from '../header-hav/HeaderNav';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function Header({ history }) {
  return (
    <header>
      <ErrorBoundary>
        <HeaderNav history={history} />
      </ErrorBoundary>
    </header>
  );
}

export default Header;

