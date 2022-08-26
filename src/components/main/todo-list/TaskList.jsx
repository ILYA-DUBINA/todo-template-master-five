import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { todos, onDeleted, onToggleItem, onToggleItemEditing, onStartTimer, onPauseTimer, updateItem } = this.props;

    let elements = todos.map((item) => {
      const { id } = item;

      return (
        <Task
          key={id}
          {...item}
          onStartTimer={() => onStartTimer(id)}
          onPauseTimer={() => onPauseTimer(id)}
          onDeleted={() => onDeleted(id)}
          onToggleItem={() => onToggleItem(id)}
          onToggleItemEditing={() => onToggleItemEditing(id)}
          updateItem={updateItem}
        />
      );
    });

    return (
      <>
        <ul className="todo-list">{elements}</ul>
      </>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleItem: PropTypes.func,
  onToggleItemEditing: PropTypes.func,
  updateItem: PropTypes.func,
};
