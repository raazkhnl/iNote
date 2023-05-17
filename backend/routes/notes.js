const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: Get all notes using: api/auth/getallnotes    login Req.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Something Went wrong!ERROR!!");
	}
});

//Route 2: Add all notes using post : api/auth/addnote  login Req.
router.post(	"/addnote",	fetchuser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body("description", "Enter a proper description").isLength({ min: 3 }),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			//If there are errors, return Bad Request status
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = await new Note({
				title,
				description,
				tag,
				user: req.user.id, //note with title, description,tag,and user.id
			});
			const savedNote = await note.save();

			res.json(savedNote);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error!!");
		}
	}
);

//Route 3: Update existing note using put(recommended) : api/auth/updatenote  login Req.
router.put(	"/updatenote/:id",	fetchuser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body("description", "Enter a proper description").isLength({ min: 3 }),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			//If there are errors, return Bad Request status
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
            //Create Newnote object
			const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            //Find note to be updated and update it
            let note = await Note.findById(req.params.id)
            if(!note){res.status(404).send("Not Found")} //if the note doesnot exists
            if(note.user.toString() !== req.user.id){   //if notes'creater id and note's updater id are not same
                return res.status(401).send("Not Authorized!")
            }

            //If all valid
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
			res.json(note);

		} catch (error) {
			console.error(error.message);
			res.status(500).send("Something Went wrong!ERROR!!");
		}
	}
);

//Route 4: Delete existing note using delete(recommended) : api/auth/deletenote  login Req.
router.delete(	"/deletenote/:id",	fetchuser, async (req, res) => {
		try {	
           //Find note to be deleted and delete it
            let note = await Note.findById(req.params.id)
            if(!note){return res.status(404).send("Note Not Found!!")} //if the note doesnot exists //for error in noteid
            if(note.user.toString() !== req.user.id){   //if notes'creater id and note's deleter id are not same    //for error in userid
                return res.status(401).send("Not Authorized!!")
            }

            //If all valid
            note = await Note.findByIdAndDelete(req.params.id)
			res.json({"Success": "A note has been deleted!!", note: note});

		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error!!");
		}
	}
);


module.exports = router;
