import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';
import './indexTimer.css';

import _uniqueId from 'lodash/uniqueId';

import NewTaskForm from './components/header/NewTaskForm';
import Footer from './components/main/footer/Footer';
import TaskList from './components/main/todo-list/TaskList';

const AppContent = () => {
  let name = null;
  let term = '';

  const [arrayElements, setArrayElements] = useState([
    createTodoItem('Completed task'),
    createTodoItem('Editing task'),
    createTodoItem('Active task'),
  ]);

  const [filterSearch, setFilterSearch] = useState(null);
  const [idState, setIdState] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  function createTodoItem(description, minutes = 0, seconds = '00') {
    return {
      description: description,
      name: name,
      date: new Date(),
      id: +_uniqueId(),
      minutes: +minutes,
      seconds: seconds,
    };
  }
  function search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }
  function filterFunc(items, filter) {
    if (filter === undefined) {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
    return items;
  }

  const updateItem = (id, newDescription) => {
    setArrayElements((arrayElements) => {
      const idx = arrayElements.findIndex((el) => el.id === id);

      let newItem = arrayElements[idx];
      newItem = createTodoItem(newDescription);

      const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

      return [...newArrayElements];
    });
  };
  const deletedItem = (id) => {
    setArrayElements((arrayElements) => {
      const idx = arrayElements.findIndex((el) => el.id === id);

      const newArrayElements = [...arrayElements.slice(0, idx), ...arrayElements.slice(idx + 1)];

      return [...newArrayElements];
    });
  };
  const allDeletedItems = () => {
    setArrayElements([...arrayElements.slice(arrayElements[0], arrayElements[arrayElements.length - 1])]);
  };
  const addItem = (description, min, sec) => {
    const newItem = createTodoItem(description, min, sec);

    setArrayElements([...arrayElements, newItem]);
  };
  const onToggleItem = (id) => {
    setArrayElements((arrayElements) => {
      const idx = arrayElements.findIndex((el) => el.id === id);

      const oldItem = arrayElements[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

      return [...newArrayElements];
    });
  };
  const onToggleItemEditing = (id) => {
    setArrayElements((arrayElements) => {
      const idx = arrayElements.findIndex((el) => el.id === id);

      const oldItem = arrayElements[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

      return [...newArrayElements];
    });
  };
  const onFilterChange = (filter) => {
    setFilterSearch(filter);
  };

  const onPauseTimer = (id) => {
    setIdState(id);
    setIsCounting(false);
  };
  const onStartTimer = (id) => {
    setIdState(id);
    setIsCounting(true);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      isCounting &&
        setArrayElements((arrayElements) => {
          const idx = arrayElements.findIndex((el) => el.id === idState);
          const oldItem = arrayElements[idx];
          let newItem;

          newItem = {
            ...oldItem,
            seconds:
              oldItem.seconds < '09'
                ? (parseInt(oldItem.seconds, 10) + 101).toString().substr(1)
                : +oldItem.seconds + 1,
          };

          if (oldItem.seconds === 59) {
            newItem = { ...oldItem, minutes: oldItem.minutes + 1, seconds: (oldItem.seconds = '00') };
          }

          const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];
          return [...newArrayElements];
        });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  const allActiveItemsVisible = filterFunc(search(arrayElements, term), filterSearch);

  const toggleItem = arrayElements.filter((item) => item.completed).length;
  const toggleItemEditing = arrayElements.filter((item) => item.name === 'editing').length;
  const allActiveItem = arrayElements.length - toggleItem - toggleItemEditing;

  return (
    <>
      <NewTaskForm addItemElementForm={addItem} />
      <section className="main">
        <TaskList
          todos={allActiveItemsVisible}
          onDeleted={deletedItem}
          onToggleItem={onToggleItem}
          onStartTimer={onStartTimer}
          onPauseTimer={onPauseTimer}
          updateItem={updateItem}
          onToggleItemEditing={onToggleItemEditing}
        />
        <Footer
          allActiveItem={allActiveItem}
          filter={filterSearch}
          onFilterChange={onFilterChange}
          allDeletedItems={allDeletedItems}
        />
      </section>
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));
root.render(<AppContent />);
