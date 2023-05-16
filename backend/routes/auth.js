const express = require('express')
const router =  express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Creat a user using POST /api/auth/createuser No login req


router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('email',"Valid email is required").isEmail(),
    body('password',"password must be atleast of 5 characters").isLength({min: 5}),


], async (req, res)=>{
//If there are errors, return Bad Request status
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  
//Ckeck if user with same exists already
try {

   let user = await User.findOne({email: req.body.email});//Returns T / F
   if (user){
    return res.status(400).json({error: "User with the email already exists."})
   }
   //Create a new user
   user= await User.create({
        name:req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    res.json(user)
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Something Went wrong!ERROR!!")
}
})
module.exports = router