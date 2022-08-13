import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.addItemElementForm(this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="new-todo"
              onChange={this.onLabelChange}
              placeholder="What needs to be done?"
              value={this.state.label}
              autoFocus
            />
          </form>
        </header>
      </>
    );
  }
}

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func,
  onLabelChange: PropTypes.func,
};
