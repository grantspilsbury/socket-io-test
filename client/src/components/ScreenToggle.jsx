import React, { Component } from 'react';
import $ from 'jquery';

class ScreenToggle extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(component) {
    this.toggleButtons(component);
    this.props.handleClick(component);
  }

  toggleButtons(component) {
    var $chat = $('#chat').removeClass('positive');
    var $whiteboard = $('#whiteboard').removeClass('positive');
    var $editor = $('#editor').removeClass('positive');
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
        </div>
      </div>
    );
  }
}

export default ScreenToggle;