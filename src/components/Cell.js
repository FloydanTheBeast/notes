import React, { Component } from 'react'
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js'
import CellTypePicker from './CellTypePicker'
import TodoList from './TodoList'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

const md = require('markdown-it')({
    html: true   
})

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.props.cell.text || '')),
            uncompiledText: this.props.cell.text,
            isFocused: false,
            isEditing: false,
            code: ''
        }
        this.editor = React.createRef()
        this.onChange = (editorState) => {
            const { editCell } = this.props.actions
            const { cell } = this.props
            this.setState({ editorState }) 
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

    componentDidUpdate() {
        if (this.props.cell.cell_type === 'MARKDOWN' && this.state.isEditing && this.editorField)
            this.editorField.focus()
    }

    render() {
        const { deleteCell, 
                editCellType, 
                addTodo, 
                toggleTodo, 
                editTodo,
                deleteTodo } = this.props.actions
                
        const { cell } = this.props
        
        return (
            <div className={`cell ${this.state.isFocused ? 'active': ''}`} ref={this.editor}>
                <CellTypePicker resetState={() => { this.setState({ editorState: EditorState.createEmpty() })}} cell={cell} editCellType={editCellType}/>
                <div className='editor' onClick={this.handleEditorClick.bind(this)}>  
                    {(() => {
                        switch (cell.cell_type) {
                            case 'MARKDOWN': {
                                return (
                                    !this.state.isFocused ?
                                        <div onClick={this.focusMarkdownEditor.bind(this)} dangerouslySetInnerHTML={{__html: md.render(this.state.editorState.getCurrentContent().getPlainText() || '<br/>')}}></div>
                                    :           
                                    <Editor
                                        onBlur={this.blurMarkdownEditor.bind(this)}
                                        editorState={this.state.editorState}
                                        onChange={this.onChange}
                                        ref={node => this.editorField = node}
                                        stripPastedStyles={true}
                                    />
                                )
                            }   
                            case 'PLAIN_TEXT': {
                                return (
                                    <Editor
                                        editorState={this.state.editorState}
                                        onChange={this.onChange}
                                        ref={node => this.editorField = node}
                                        stripPastedStyles={true}
                                    />
                                )
                            }
                            case 'TODO_LIST': {
                                return (
                                    <TodoList
                                        cellId={cell.id}
                                        addTodo={addTodo}
                                        editTodo={editTodo}
                                        toggleTodo={toggleTodo}
                                        deleteTodo={deleteTodo}
                                        todoList={cell.todoList} />
                                )
                            }
                            case 'CODE_SNIPPET': {
                                return (
                                    <CodeEditor
                                        value={this.state.code}
                                        onValueChange={code => this.setState({ code })}
                                        highlight={code => highlight(code, Prism.languages.javascript, 'javascript')}
                                        // padding={10}
                                        style={{
                                            fontFamily: '"Fira code", "Fira Mono", monospace',
                                            fontSize: 18,
                                        }}
                                    />
                                )
                            }
                            default:
                                return (
                                    <h1>Unrecognised cell type :(</h1>
                                )
                        }
                    })()}
                </div>
                <div className='cell-delete-btn' onClick={() => deleteCell(cell.id)}>Delete</div>
            </div>
        )
    }

    blurMarkdownEditor() {
        this.setState({ isEditing: false })
    }

    focusMarkdownEditor() {
        this.setState({ isEditing: true })
    }

    handleEditorClick() {
        if (this.editorField) {
            this.editorField.focus()
        }
    }

    handleFocus(e) {
        if (this.editor.current) {
            if (!this.editor.current.contains(e.target))
                this.setState({ isFocused: false })
            else this.setState({ isFocused: true })
        }
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