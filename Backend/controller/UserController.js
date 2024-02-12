const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const key = process.env.JWT_KEY

const {userServices} = require('../services')

const signup = async (req, res) => {

    try{
        const response = await userServices.signup(req);
        if(response == 'User already exists! Login instead'){
            return res.status(400).json({response})
        }
        else{
            return res.status(201).json({message: response})
        }
    }
    catch(err) {
        console.log(err)
    }
}

const login = async (req, res) => {

    try{
        const response = await userServices.login(req, res)
        if(response == 'User not found. Signup Please!'){
            return res.status(400).json({response})
        }
        else if(response == "Invalid Email / Password"){
            return res.status(400).json({response})
        }
        else{
            const token = jwt.sign({id: response._id}, key, {
                expiresIn: "1hr"
            });
            console.log("Generated Token\n", token);
            return res.status(200).json({message: "Successfully Logged In", user: response, token})
        }
    }
    catch(err){
        console.log(err)
    }

}


const verifyToken = (req, res, next) => {

    const headers = req.headers[`authorization`]
    const token = headers.split(" ")[1]
    
    // console.log(headers)

    if(!token) {
        res.status(404).json({message: "No token Found"})
    }
    jwt.verify(String(token),key, (err, user) => {
        if(err) {
          return  res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id);
        req.id = user.id
    });
    next();

};

const getUser = async (req,res,next) => {
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId, "-password")
    }catch(err){
        return new Error(err)
    }
    if(!user) {
        return res.status(404).json({message: "User Not Found"}) 
    }
    return res.status(200).json({user})
}

// const refreshToken = (req, res, next) => {
//     const cookies = req.headers.cookie;
//     const prevToken = cookies.split('=')[1];

// if(!prevToken) {
//     return res.status(400).json({message: "Couldn't find token"})
// }
// jwt.verify(String(prevToken), key, (err,user) => {
//     if(err){
//         console.log(err);
//         return res.status(403).json({message: 'Authentication failed'});
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";

//     const token =jwt.sign({id: user.id}, key, {
//         expiresIn: "35s"
//     })

//     console.log("Regenerated Token\n", token);

//     res.cookie(String(user.id), token, {
//         path: '/',
//         expires: new Date(Date.now() + 1000 * 30),
//         httpOnly: true,
//         sameSite: 'lax'
//     });

//     req.id = user.id;
//     next();
// });
// }

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken
exports.getUser = getUser;
// exports.refreshToken = refreshToken
