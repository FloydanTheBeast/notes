import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            isFocused: false
        };
        this.editor = React.createRef();
        this.onChange = (editorState) => this.setState({editorState});
    }

    componentDidMount() {
        document.addEventListener('click', e => this.focus(e))
    }

    render() {
        return (
            <div className={`editor ${this.state.isFocused ? 'active': ''}`}
             onClick={this.focus.bind(this)}
             ref={this.editor}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={node => this.editorField = node}
                />
            </div>
        );
    }

    focus(e) {
        if (this.editor) {
            if (this.editor.current.contains(e.target))  {
                this.setState({ isFocused: true })
                this.editorField.focus()
            }
            else {
                this.setState({ isFocused: false })
            }
        }
    }
}

export default TextEditor;