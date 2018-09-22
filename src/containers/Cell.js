import { connect } from 'react-redux'
import Cell from '../components/Cell'
import addCell from '../actions/index'

const mapStateToProps = state => ({
    text: state.text,
    id: state.id
})

const mapDispatchToProps = dispatch => ({
    addCell: text => dispatch(addCell(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
