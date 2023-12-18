import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = { taskTitle: '', minutes: '', seconds: '' };
  static defaultProps = {
    onTyped: () => {
      console.log('no function set for typing');
    },
  };
  static propTypes = {
    onTyped: PropTypes.func,
  };
  updateState = (e) => {
    if (e.target.id === 'input-title') {
      this.setState({
        taskTitle: e.target.value,
      });
    }
    if (e.target.id === 'input-min') {
      if (!isNaN(Number(e.target.value))) {
        this.setState({
          minutes: e.target.value,
        });
      } else {
        this.setState({
          minutes: null,
        });
      }
    }
    if (e.target.id === 'input-sec') {
      if (!isNaN(Number(e.target.value))) {
        this.setState({
          seconds: e.target.value,
        });
      } else {
        this.setState({
          seconds: null,
        });
      }
    }
    if (this.state.taskTitle && this.state.minutes && this.state.seconds) {
      this.pressKey(e);
    }
  };
  pressKey = (e) => {
    if (e.key === 'Enter') {
      this.props.onTyped(this.state);
      document.querySelector('.new-todo-form').reset();
    }
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input className="new-todo" id="input-title" placeholder="Task" autoFocus="" onKeyUp={this.updateState} />
          <input
            className="new-todo-form__timer"
            id="input-min"
            placeholder="Min"
            autoFocus=""
            onKeyUp={this.updateState}
          />
          <input
            className="new-todo-form__timer"
            id="input-sec"
            placeholder="Sec"
            autoFocus=""
            onKeyUp={this.updateState}
          />
        </form>
      </header>
    );
  }
}
