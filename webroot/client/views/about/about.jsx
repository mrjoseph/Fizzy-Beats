import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

class About extends Component {
  render() {
    const { location } = this.props;
    const { foo } = queryString.parse(location.search);
    return (
      <div>
        <h1>
          About my app
          {' '}
          {foo}
        </h1>
      </div>
    );
  }
}

About.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};
export default About;
