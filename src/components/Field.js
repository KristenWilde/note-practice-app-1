import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Field extends Component {
  state = {
    value: this.props.value,
    error: false
  }

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  _handleInputChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props._handleInputChange({ name, error, value });
  }

  render() {
    return (
      <div>
        <input
          id={this.props.id}
          placeholder={this.props.placeholder}
          minLength={this.props.minLength}
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={this._handleInputChange}
        />
        <span style={{ color: 'red'}}>{this.state.error}</span>
      </div>
    );
  }
}

Field.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired 
}