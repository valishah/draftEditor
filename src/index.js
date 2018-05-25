import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import './Draft.css';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.blockStyleFn = this.handleKeyCommand.bind(this);
  }

  handleReturn(event, editorState){
      console.log(event.keyCode);
      if(event.keyCode === 13){
        console.log(editorState.getCurrentContent().getPlainText());
        console.log(editorState.getCurrentContent().getText());
      }
      
  }

  handleKeyCommand(command, editorState){
    console.log(command);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  
  blockStyleFn(contentBlock){
    const type = contentBlock.getType();
    if(type === 'blockquote'){
        return 'superFancyBlockQuote';
    }
  }


  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        handleReturn={this.handleReturn}
        onChange={this.onChange}
        blockStyleFn={this.blockStyleFn}
      />
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('container')
);