import React, { Component } from 'react';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';
import './indexTimer.css';

import NewTaskForm from './components/header/NewTaskForm';
import Footer from './components/main/footer/Footer';
import TaskList from './components/main/todo-list/TaskList';

class AppContent extends Component {
  constructor(props) {
    super(props);

    this.maxId = 100;
    this.name = null;
    this.timer = 0;
    this.timerInterval = 1000;

    this.state = {
      arrayElements: [
        this.createTodoItem('Completed task'),
        this.createTodoItem('Editing task'),
        this.createTodoItem('Active task'),
      ],
      term: '',
      filter: null,
      id: null,
    };
    this.updateItem = (id, newDescription) => {
      this.setState(({ arrayElements }) => {
        const idx = arrayElements.findIndex((el) => el.id === id);

        let newItem = arrayElements[idx];
        newItem = this.createTodoItem(newDescription, this.dater);

        const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

        return {
          arrayElements: newArrayElements,
        };
      });
    };
    this.deletedItem = (id) => {
      this.setState(({ arrayElements }) => {
        const idx = arrayElements.findIndex((el) => el.id === id);

        const newArrayElements = [...arrayElements.slice(0, idx), ...arrayElements.slice(idx + 1)];

        return {
          arrayElements: newArrayElements,
        };
      });
    };
    this.allDeletedItems = () => {
      this.setState(({ arrayElements }) => {
        const newArrayElements = [...arrayElements.slice(arrayElements[0], arrayElements[arrayElements.length - 1])];

        return {
          arrayElements: newArrayElements,
        };
      });
    };
    this.addItem = (description, min, sec) => {
      const newItem = this.createTodoItem(description, min, sec);

      this.setState(({ arrayElements }) => {
        const newArr = [...arrayElements, newItem];

        return {
          arrayElements: newArr,
        };
      });
    };
    this.onToggleItem = (id) => {
      this.setState(({ arrayElements }) => {
        const idx = arrayElements.findIndex((el) => el.id === id);

        const oldItem = arrayElements[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed };

        const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

        return {
          arrayElements: newArrayElements,
        };
      });
    };
    this.onToggleItemEditing = (id) => {
      this.setState(({ arrayElements }) => {
        const idx = arrayElements.findIndex((el) => el.id === id);

        const oldItem = arrayElements[idx];
        const newItem = { ...oldItem, editing: !oldItem.editing };

        const newArrayElements = [...arrayElements.slice(0, idx), newItem, ...arrayElements.slice(idx + 1)];

        return {
          arrayElements: newArrayElements,
        };
      });
    };
    this.onFilterChange = (filter) => {
      this.setState({ filter });
    };

    this.onPauseTimer = (id) => {
      this.setState({
        id: id,
      });
    };

    this.onStartTimer = (id) => {
      this.setState({
        id: null,
      });
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.state.id !== id) {
          this.setState(({ arrayElements }) => {
            const idx = arrayElements.findIndex((el) => el.id === id);

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
            return {
              arrayElements: newArrayElements,
            };
          });
        }
      }, this.timerInterval);
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createTodoItem(description, minutes = 0, seconds = '00') {
    return {
      description: description,
      name: this.name,
      date: new Date(),
      id: this.maxId++,
      minutes: +minutes,
      seconds: seconds,
    };
  }
  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }
  filter(items, filter) {
    if (filter === undefined) {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
    return items;
  }

  render() {
    const { arrayElements, term, filter } = this.state;

    const allActiveItemsVisible = this.filter(this.search(arrayElements, term), filter);

    const toggleItem = arrayElements.filter((item) => item.completed).length;
    const toggleItemEditing = arrayElements.filter((item) => item.name === 'editing').length;
    const allActiveItem = arrayElements.length - toggleItem - toggleItemEditing;

    return (
      <>
        <NewTaskForm addItemElementForm={this.addItem} />
        <section className="main">
          <TaskList
            todos={allActiveItemsVisible}
            onDeleted={this.deletedItem}
            onToggleItem={this.onToggleItem}
            onStartTimer={this.onStartTimer}
            onPauseTimer={this.onPauseTimer}
            updateItem={this.updateItem}
            onToggleItemEditing={this.onToggleItemEditing}
          />
          <Footer
            allActiveItem={allActiveItem}
            filter={filter}
            onFilterChange={this.onFilterChange}
            allDeletedItems={this.allDeletedItems}
          />
        </section>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));
root.render(<AppContent />);
