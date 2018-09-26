import React, { Component } from 'react'
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js'
import CellTypePicker from './CellTypePicker'

const md = require('markdown-it')()

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.props.cell.text || '')),
            uncompiledText: this.props.cell.text,
            isFocused: false,
        }
        this.editor = React.createRef()
        this.onChange = (editorState) => {
            const { editCell } = this.props.actions
            const { cell } = this.props
            this.setState({editorState}) 
            editCell(editorState.getCurrentContent().getPlainText().trimRight(), cell.id)
        };
    }

    componentDidMount() {
        document.addEventListener('click', e => this.handleFocus(e))
        window.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    componentWillUnmount() {
        document.removeEventListener('click', e => this.handleFocus(e))
        window.removeEventListener('keydown', e => this.handleKeyDown(e))
    }

    render() {
        const { deleteCell, editCellType } = this.props.actions
        const { cell } = this.props
        
        return (
            <div className={`cell ${this.state.isFocused ? 'active': ''}`} ref={this.editor}>
                <CellTypePicker cell={cell} editCellType={editCellType}/>
                <div className='editor' onClick={this.handleEditorClick.bind(this)}>  
                    {(() => {
                        switch (cell.cell_type) {
                            case 'MARKDOWN':
                                return (
                                    !this.state.isFocused ?
                                        <div dangerouslySetInnerHTML={{__html: md.render(this.state.editorState.getCurrentContent().getPlainText())}}></div>
                                    :           
                                    <Editor
                                        editorState={this.state.editorState}
                                        onChange={this.onChange}
                                        ref={node => this.editorField = node}
                                        stripPastedStyles={true}
                                    />
                                )
                            case 'PLAIN_TEXT' :
                                return (
                                    <Editor
                                        editorState={this.state.editorState}
                                        onChange={this.onChange}
                                        ref={node => this.editorField = node}
                                        stripPastedStyles={true}
                                    />
                                )
                            default:
                                return (
                                    <h1>Unrecognised cell type :(</h1>
                                )
                        }
                    })()}
                </div>
                <div className='cell-delete-btn' onClick={() => deleteCell(cell.id)}>Delete</div>
            </div>
        );
    }

    handleEditorClick() {
        if (this.editorField)
            this.editorField.focus()
    }

    handleFocus(e) {
        if (this.editor)
            if (!this.editor.current.contains(e.target))
                this.setState({isFocused: false})
        else this.setState({isFocused: true})
    }

    handleKeyDown(e) {
        if (e.code === 'Escape') {
            if (this.editorField)
                this.editorField.blur()
            this.setState({ isFocused: false })
        }
    }
}

export default TextEditor;