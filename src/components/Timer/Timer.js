import { Component } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

export default class Timer extends Component {
  state = { count: 1, interval: null };
  interval = null;
  updateTimer = (e) => {
    if (e.target.className === 'icon icon-play') {
      const updateTimeout = () => {
        let count = this.state.count;
        this.setState({
          timeCurrent: new Date(count * 1000),
          count: count + 1,
        });
        this.getTimeString();
        this.interval = setTimeout(updateTimeout, 1000);
      };
      this.interval = setTimeout(updateTimeout, 1000);
    } else {
      clearTimeout(this.interval);
    }
  };

  getTimeString = () => {
    let timeString = '';
    if (this.state.timeCurrent) {
      timeString = this.state.timeCurrent.toLocaleTimeString([], {
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return timeString;
  };

  createInitialTimer = () => {
    const { passedTime } = this.props;
    while (passedTime[0] > 0) {
      passedTime[0] = passedTime[0] - 1;
      passedTime[1] = Number(passedTime[1]) + 60;
    }
    if (passedTime[1] > 0) {
      this.setState({
        count: Number(passedTime[1]),
      });
    }
  };

  componentDidMount() {
    this.createInitialTimer();
  }

  render() {
    const { completed } = this.props;
    const classes = {
      play: cn('icon icon-play', {
        hidden: completed,
      }),
      pause: cn('icon icon-pause', {
        hidden: completed,
      }),
    };
    if (completed) {
      clearTimeout(this.interval);
    }
    return (
      <span className="description">
        <button className={classes.play} onClick={this.updateTimer}></button>
        <button className={classes.pause} onClick={this.updateTimer}></button>
        {this.getTimeString()}
      </span>
    );
  }
}

Timer.defaultProps = {
  completed: false,
  passedTime: [0, 0],
};

Timer.propTypes = {
  completed: propTypes.bool,
  passedTime: propTypes.array,
};
