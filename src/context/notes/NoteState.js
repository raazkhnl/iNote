import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const notesInitial = 
      [
        {
          "_id": "6464d311a5871f344ef3bb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": "ToDo dodo",
          "description": "Things to do..",
          "tag": "Personal",
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        },
        {
          "_id": "6464d311a58731f344efbb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": "ToDo Less Goo baiby yeah",
          "description": "Things to do..",
          "tag": "Personal",
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        },
        {
          "_id": "6464d3131a5871f344efbb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": "ToDo",
          "description": "Things to do orem orem ipsum dolor sit ametipsum dolor sit amet..",
          "tag": "Personal",
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        },
        {
          "_id": "6464d2311a5871f344efbb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": "ToDo",
          "description": "Things to do..",
          "tag": "Personal",
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        }, 
        {
          "_id": "6464d311a58721f344efbb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": "ToDo",
          "description": "Things to doorem ipsum dolor orem ipsum dolor sit ametsit amet lorem dis dksd..",
          "tag": "Personal",
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        }
      ]
     const [notes, setNotes] = useState(notesInitial)
    //Add Note
      const addNote=(title, description, tag)=>{
        const note = {
          "_id": "64642d311a5871fs344efbb14b",
          "user": "64637644c8b96d7eccef96ae",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-05-17T13:13:53.339Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
    //Delete Note
    const deleteNote=(title, description, tag)=>{
    
    }


    //Edit Node
    const editNote = ()=>{

    }


  return (
<NoteContext.Provider value={{notes, addNote, deleteNote, editNote }}>   
   {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState
// export {addNote}