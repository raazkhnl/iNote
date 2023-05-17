const mongoose = require('mongoose')
const {Schema} = mongoose;


const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   //userid as foreign key
        ref: 'user' //user's model as ref
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model("Note", NotesSchema);