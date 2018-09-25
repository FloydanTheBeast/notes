export const addCell = text => ({type: 'ADD_CELL', text})
export const editCell = (text, id) => ({type: 'EDIT_CELL', text, id})
export const editCellType = (id, cell_type) => ({type: 'EDIT_CELL_TYPE', id, cell_type})
export const deleteCell = id => ({type: 'DELETE_CELL', id})