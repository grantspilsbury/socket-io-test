import React, { Component } from 'react';
import $ from 'jquery';

class ScreenToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.setTime = this.setTime.bind(this);
    this.timer = null;
    this.state = {
      totalSeconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    }
  }

  handleClick(component) {
    this.toggleButtons(component);
    this.props.handleClick(component);
  }

  handleTimerClick() {
    if (!this.timer) {
      this.timer = setInterval(this.setTime, 1000);
    } else {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setTime() {
    this.setState({
      totalSeconds: this.state.totalSeconds + 1
    });
    var seconds = this.pad(this.state.totalSeconds % 60);
    var minutes = this.pad(parseInt(this.state.totalSeconds / 60));
    var hours = this.pad(parseInt(this.state.totalSeconds / 3600));
    this.setState({
      seconds: seconds,
      minutes: minutes,
      hours: hours
    });
  }

  pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  toggleButtons(component) {
    var $chat = $('#chat').removeClass('positive');
    var $whiteboard = $('#whiteboard').removeClass('positive');
    var $editor = $('#editor').removeClass('positive');
    var $video = $('#video').removeClass('positive');
    var toggleButton = $('#'+component);
    toggleButton.addClass('positive');
  }

  render() {
    return (
      <div className="screenToggle">
        <div className="ui buttons">
          <button id ="chat" className="ui button positive" name="chat" onClick={this.handleClick.bind(this, 'chat')}>Chat</button>
          <div className="or"></div>
          <button id ="whiteboard" className="ui button" name="whiteboard" onClick={this.handleClick.bind(this, 'whiteboard')}>Whiteboard</button>
          <div className="or"></div>
          <button id ="editor" className="ui button" name="editor" onClick={this.handleClick.bind(this, 'editor')}>Editor</button>
          <button id ="timer" className="ui button basic mini" name="timer" onClick={this.handleTimerClick.bind(this)}>{ this.timer ? 'Stop' : 'Start' } Timer { `${this.state.hours}:${this.state.minutes}:${this.state.seconds}` }
</button>
          </div>
      </div>
    );
  }
}

export default ScreenToggle;