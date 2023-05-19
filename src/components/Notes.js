import React, { useContext } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from "../context/notes/noteContext"

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, addNote}=context;
  return (

        <>
        <AddNote/>
        <div className='row m-3'>btn
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return <NoteItem key={note._id} note ={note}/>
        })}
      </div>
        </>
    
  )
}

export default Notes