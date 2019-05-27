import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SubmitButton extends Component {
  render() {
    return <button
        className={`submit btn ${!this.props.submitDisabled()
            ? 'btn-success'
            : 'btn-secondary'}`}
        type="submit"
        disabled={this.props.submitDisabled()}
    >
      {this.props.children ? this.props.children : 'Sign up'}
    </button>;
  }
}

SubmitButton.propTypes = { submitDisabled: PropTypes.func };
