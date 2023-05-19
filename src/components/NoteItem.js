import React from 'react'

const NoteItem = (props) => {
    const {note}= props;
  return (
    <div className='col-md-3'>
        <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}
    <i className="far fa-trash-alt mx-2"></i>
    <i className="far fa-edit mx-2"></i>
    </h5>
    <p className="card-text">{note.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    

  </div>
</div>

    </div>
  )
}

export default NoteItem