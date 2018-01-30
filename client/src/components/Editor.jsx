import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  onChange(newValue) {
    console.log('change',newValue);
  }

  render() {
    return (
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={this.onChange}
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}

export default Editor;