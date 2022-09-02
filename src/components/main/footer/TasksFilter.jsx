import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      { name: null, label: 'All', id: 1 },
      { name: undefined, label: 'Active', id: 2 },
      { name: 'completed', label: 'Completed', id: 3 },
    ];
  }

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label, id }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : null;
      return (
        <li key={id}>
          <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return (
      <>
        <ul className="filters">{buttons}</ul>
      </>
    );
  }
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
