const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "secretSignForMyWeb";

//Route 1: Creat a user using POST /api/auth/createuser No login req
router.post(
	"/createuser",
	[
		body("name").isLength({ min: 3 }),
		body("email", "Valid email is required").isEmail(),
		body("password", "password must be atleast of 5 characters").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		//If there are errors, return Bad Request status
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Ckeck if user with same exists already
		try {
			let user = await User.findOne({ email: req.body.email }); //Returns T / F
			if (user) {
				return res
					.status(400)
					.json({ error: "User with the email already exists." });
			}

			const salt = await bcrypt.genSalt(10); //salt of len 10
			secPass = await bcrypt.hash(req.body.password, salt); //secured password= password+salt
			//Create a new user
			user = await User.create({
				name: req.body.name,
				password: secPass, //securedPassword using bcrypt above
				email: req.body.email,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);   //auth token = userid + signature in hash form
			res.json({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Something Went wrong!ERROR!!");
		}
	}
);

//Route 2: Authinticate a user using POST /api/auth/login No login req
router.post(
	"/login",
	[
		body("email", "Valid email is required").isEmail(),
		body("password", "Password cannot be blank").exists(),
	],
	async (req, res) => {
		//If there are errors, return Bad Request status and errmsg
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
        const {email, password}= req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Invalid Credentials"})   //Actually user doesnot exists
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error: "Invalid Credentials"})   //Actually invalid password but we send same msg for security purpose
            }

            const payload = {
                user:{
                    id: user.id

                }
            }
            const data = {
				user: {
					id: user.id,
				},
			}
			const authToken = jwt.sign(data, JWT_SECRET);   //auth token = userid + signature in hash form
			res.json({ authToken });
            
        } catch (error) {
            console.error(error.message);
			res.status(500).send("Something Went wrong!ERROR!!");
        }
	}
);

//Route 3: Get loggedin user detail using POST /api/auth/getuser No login req
router.post(
	"/getuser", fetchuser,	async (req, res) => {
		    try {
            const userId = req.user.id;
            const  user = await User.findById(userId).select("-password");
            res.send(user)
           
        } catch (error) {
            console.error(error.message);
			res.status(500).send("Something Went wrong!ERROR!!");
        }
	}
);

module.exports = router;
