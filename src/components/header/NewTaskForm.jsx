import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      let min = Number(this.state.minutes);
      let sec = this.state.seconds.length === 1 ? '0' + this.state.seconds : this.state.seconds;
      this.props.addItemElementForm(this.state.label, min, sec);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    };
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <form className="new-todo-form" id="form" onSubmit={this.onSubmit}>
            <input
              form="form"
              name="label"
              type="text"
              className="new-todo"
              onChange={this.onLabelChange}
              placeholder="What needs to be done?"
              value={this.state.label}
              autoFocus
            />
            <input
              form="form"
              name="minutes"
              type="number"
              className="new-todo-form__timer"
              placeholder="Min"
              onChange={this.onLabelChange}
              value={this.state.minutes}
              autoFocus
            />
            <input
              form="form"
              name="seconds"
              type="number"
              className="new-todo-form__timer"
              placeholder="Sec"
              onChange={this.onLabelChange}
              value={this.state.seconds}
              autoFocus
            />
            <input style={{ display: 'none' }} type="submit" value="Submit" />
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
