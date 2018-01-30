import React, { Component } from 'react';
import Chat from './Chat.jsx';
import Editor from './Editor.jsx';
import Whiteboard from './Whiteboard.jsx';
import ScreenToggle from './ScreenToggle.jsx';
import axios from 'axios';
import io from 'socket.io-client';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(`http://localhost:3000`);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      channelId: '',
      name: '',
      messages:[],
      screen: 'chat'
    };
  }

  componentDidMount() {
    if (!this.state.name.length) {
      //this.getName();
    }
    const channelId = this.props.match.params.id;
    var context = this;
    this.socket.on('connect', () => {
      console.log('Socket io connected');
      context.joinChannel(channelId);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from io server');
    });

    this.socket.on(`server:newMessage`, data => {
      context.setState({
        messages: context.state.messages.concat([data])
      });
      console.log('Message received from server and added to state', data);
    });
  };

  joinChannel(channelId) {
    var context = this;
    if (channelId) {
      this.socket.emit('client:joinChannel', channelId, (err, channel, messages)=>{
        if (channel) {
          context.setState({channelId: channel._id, messages: messages});
        } else {
          alert('Unknown channel id. Please check that you have the correct url');
          this.socket.disconnect();
        }
      });
    }
  }

  getName() {
    var name = prompt('What is your name?');
    if (name) {
      this.setState({name: name});
    } else {
      this.getName();
    }
  }

  handleClick(screen) {
    this.setState({screen: screen});
  }

  render() {
    let screen;
    if (this.state.screen === 'chat') {
      screen = (
        <Chat
          socket={this.socket}
          messages={this.state.messages}
          channelId={this.state.channelId}
          name={this.state.name}
        />
      );
    } else if (this.state.screen === 'whiteboard') {
      screen = (
        <Whiteboard
          socket={this.socket}
          channelId={this.state.channelId}
        />
        );
    } else if (this.state.screen === 'editor') {
      screen = (<Editor />);
    }
    return (
      <div>
        <h1>Workspace</h1>
        <ScreenToggle handleClick={this.handleClick}/>
        {screen}
      </div>
    );
  }
}

export default Workspace;