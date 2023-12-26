import { Component } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

export default class Timer extends Component {
  state = { count: 1, interval: null, pressed: false };
  updateTimer = (e) => {
    if (!e && this.props.created) {
      const updateTimeout = () => {
        let count = this.state.count;
        this.setState({
          timeCurrent: new Date(count * 1000),
          count: count + 1,
        });
        this.getTimeString();
      };
      this.setState({ interval: setTimeout(updateTimeout, 1000) });
    } else if (e.target.className === 'icon icon-play') {
      if (this.state.pressed) {
        return null;
      }
      this.setState({
        pressed: true,
      });
      const updateTimeout = () => {
        let count = this.state.count;
        this.setState({
          timeCurrent: new Date(count * 1000),
          count: count + 1,
        });
        this.getTimeString();
        this.setState({ interval: setTimeout(updateTimeout, 1000) });
      };
      this.setState({ interval: setTimeout(updateTimeout, 1000) });
    } else {
      clearTimeout(this.state.interval);
      this.setState({
        pressed: false,
      });
    }
  };

  getTimeString = () => {
    let timeString = '';
    if (this.state.timeCurrent) {
      timeString = this.state.timeCurrent.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
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
    if (this.props.created) {
      this.updateTimer();
    }
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
      clearTimeout(this.state.interval);
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
  created: false,
  passedTime: [0, 0],
};

Timer.propTypes = {
  completed: propTypes.bool,
  created: propTypes.bool,
  passedTime: propTypes.array,
};
