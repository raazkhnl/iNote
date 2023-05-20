import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext)
    const {deleteNote}=context;
    const {note, updateNote}= props;
  return (
    <div className='col-md-3'>
        <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}
    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted!!", "danger")}}></i>
    <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
    </h5>
    <p className="card-text">{note.description}</p>
    

  </div>
</div>

    </div>
  )
}

export default NoteItem