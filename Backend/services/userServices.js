const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY


exports.signup = async (req) => {
console.log(req.body)
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch (err) {
        console.log(err)
    }   
    if(existingUser){
        return "User already exists! Login instead";
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try{
        await user.save();
        return user
    }
    catch(err) {
        console.log(err)
    }

}

exports.login = async (req, res) => {
    const {email, password} = req.body

    let existingUser;
    try{
        existingUser  = await User.findOne({email:email})
        if(!existingUser) {
            return "User not found. Signup Please!"
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect) {
            return "Invalid Email / Password"
        }
        
        return existingUser
    } catch(err){
        return new Error(err);
    }
    

    // const token = jwt.sign({id: existingUser._id}, key, {
    //     expiresIn: "35s"
    // });
    // console.log("Generated Token\n", token);
    // if(req.cookies[`$(existingUser._id)`]) {
    //     req.cookies[`${existingUser._id}`] = ""
    // }
    // res.cookie(String(existingUser._id), token, {
    //     path: '/',
    //     expires: new Date(Date.now() + 1000 * 30),
    //     httpOnly: true,
    //     sameSite: 'lax'
    // });


}