import Resentence from 'resentence';
import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: props.expirationTime - Date.now()
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.props.expirationTime - Date.now() <= 0) {
        clearInterval(this.intervalId);
        this.props.onTimeExpired();
        this.setState({
          timeRemaining: 0
        })
      } else {
        this.setState({
          timeRemaining: this.props.expirationTime - Date.now()
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Resentence align='center' className="timer">{'Time left: ' + Math.ceil(this.state.timeRemaining / 1000) + ' seconds'}</Resentence>
    )
  }
}

export default Timer;