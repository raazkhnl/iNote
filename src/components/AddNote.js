import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote}=context;

    const [note, setNote] = useState({title:"", description:"", tag:""})
 
    const submitHandler=(e)=>{
        e.preventDefault()  //prevent page reload
         addNote(note.title, note.description, note.tag)
         setNote({title:"", description:"", tag:""})
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value}) //Any changein value must be added in name
    }
  return (
    <div className='container my-3'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
       
          <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={submitHandler}>Add Note</button>
        </form>

      </div>
  )
}

export default AddNote