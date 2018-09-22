import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class NotFound extends Component {
  render() {
    const { location } = this.props;
    const { foo } = queryString.parse(location.search);
    return (
      <div>
        <h1>
          Page not found
        </h1>
      </div>
    );
  }
}
export default withRouter(NotFound);
