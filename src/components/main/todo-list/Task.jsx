import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newLabel: this.props.description,
    };

    this.onLabelChangeTwo = (e) => {
      this.setState({
        newLabel: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.updateItem(this.props.id, this.state.newLabel);
    };
  }

  render() {
    let {
      name,
      description,
      onDeleted,
      onToggleItem,
      onToggleItemEditing,
      onStartTimer,
      onPauseTimer,
      editing,
      completed,
      date,
      minutes,
      seconds,
    } = this.props;

    if (completed) {
      name = 'completed';
    }
    if (editing) {
      name = 'editing';
    }

    return (
      <>
        <li className={name}>
          <div className="view">
            {name === 'completed' ? (
              <input className="toggle" type="checkbox" onClick={onToggleItem} defaultChecked />
            ) : (
              <input className="toggle" type="checkbox" onClick={onToggleItem} />
            )}
            <label>
              <span className="title">{description}</span>
              <span className="description">
                <button className="icon icon-play" onClick={onStartTimer}></button>
                <button className="icon icon-pause" onClick={onPauseTimer}></button>
                <div>
                  <span>{minutes}</span> : <span>{seconds}</span>
                </div>
              </span>
              <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
            </label>
            <button className="icon icon-edit" onClick={onToggleItemEditing}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
          {name === 'editing' ? (
            <form onSubmit={this.onSubmit}>
              <input type="text" className="edit" onChange={this.onLabelChangeTwo} value={this.state.newLabel} />
            </form>
          ) : null}
        </li>
      </>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleItem: PropTypes.func,
  onToggleItemEditing: PropTypes.func,
  editing: PropTypes.bool,
  completed: PropTypes.bool,
  date: PropTypes.object,
};
