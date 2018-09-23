import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.props.cell.text || '')),
            isFocused: false
        };
        this.editor = React.createRef();
        this.onChange = (editorState) => {
            const { editCell } = this.props.actions
            const { cell } = this.props
            this.setState({editorState}) 
            editCell(editorState.getCurrentContent().getPlainText().trimRight(), cell.id)
        };
    }

    componentDidMount() {
        document.addEventListener('click', e => this.focus(e))
        // window.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    componentWillUnmount() {
        document.removeEventListener('click', e => this.focus(e))
    }

    render() {
        const { deleteCell } = this.props.actions
        const { cell } = this.props

        return (
            <div className={`cell ${this.state.isFocused ? 'active': ''}`}
             onClick={this.focus.bind(this)}
             ref={this.editor}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={node => this.editorField = node}
                />
                <div onClick={() => deleteCell(cell.id)}>Delete</div>
            </div>
        );
    }

    focus(e) {
        if (this.editor.current) {
            if (this.editor.current.contains(e.target))  {
                this.setState({ isFocused: true })
                this.editorField.focus()
            }
            else {
                this.setState({ isFocused: false })
            }
        }
    }

    // handleKeyDown(e) {
    //     const { addCell } = this.props
    //     const { editorState } = this.state
    //     if (e.code === 'Enter' && e.ctrlKey && this.state.isFocused) {
    //         addCell(editorState.getCurrentContent().getPlainText().trimRight())
    //         this.setState({
    //             editorState: EditorState.createEmpty()
    //         })
    //         this.editorField.blur()
    //         this.setState({ isFocused: false })
    //     }
    // }
}

export default TextEditor;