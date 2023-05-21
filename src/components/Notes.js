import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const clickHandler = async (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note Updated Successfully!!", 'success')

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    //search
    const [query, setQuery] = useState("")
    const [result, setResult] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()  //prevent page reload

        const filteredNotes = notes.filter((note) => {
            const { title, description, tag } = note;
            const lowerCaseQuery = query.toLowerCase();
            return (

                title.toLowerCase().includes(lowerCaseQuery) ||
                description.toLowerCase().includes(lowerCaseQuery) ||
                tag.toLowerCase().includes(lowerCaseQuery)
            );
        });
        if(!query){setResult("")}
        else{
            
        if(filteredNotes.length){
            setResult(filteredNotes)
        props.showAlert("Displaying Some Matching Notes!!", "success")
        }
        else{
            setResult("")
        props.showAlert("No Matching Notes Found!!", "danger")
        }
        }
    }

    const onQuery = (e) => {
        setQuery(e.target.value) //Any changein value must be added in name
    }




    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" minLength={3} required>Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" minLength={3} required>Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" minLength={3} required>Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 3} onClick={clickHandler} type="button" className="btn btn-primary" >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="d-flex justify-content-start align-items-start">
                                <div className="corner-element"><h2>You Notes</h2></div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex justify-content-start justify-content-md-end align-items-start">
                                <div className="corner-element">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="query" name="query" value={query} onChange={onQuery} />
                                        <button  className="btn btn-secondary" type="submit" onClick={submitHandler}>
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {result.length !== 0 && <h5>Search Result</h5>}
                {result.length !== 0 && result.map((note) => {
                    return <><NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/></>})}  
                {result.length !== 0 && <hr/>}

                
                <h6>{notes.length === 0 && "No notes to display."}</h6>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>

        </>

    )
}

export default Notes