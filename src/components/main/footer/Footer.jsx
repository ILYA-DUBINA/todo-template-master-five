import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

const Footer = (props) => {
  const { allActiveItem, filter, onFilterChange, allDeletedItems } = props;
  return (
    <>
      <footer className="footer">
        <span className="todo-count">{allActiveItem} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={allDeletedItems}>
          Clear completed
        </button>
      </footer>
    </>
  );
};

Footer.propTypes = {
  allDeletedItems: PropTypes.func,
  allActiveItem: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Footer;
