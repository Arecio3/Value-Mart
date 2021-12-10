const User = require('../models/user');

exports.createOrUpdateUser = async (req,res) => {
   const { name, picture, email } = req.user;
    // Find user based on email and updates name and picture, sends back new user
   const user = await User.findOneAndUpdate({email}, {name: email.split('@')[0], picture}, {new: true});
    // If theres a user it sends data if not create a new user
   if(user) {
       res.json(user)
    //    console.log("User updated", user)
   } else {
    const newUser = await new User({
        email,
        name: email.split('@')[0],
        picture,
    }).save();
    // console.log("User created", newUser)
    res.json(newUser);
   }
};