



var userService = require('../services/user.service')

let user = require("../models/users.model");
_this = this

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

exports.createUser = async function(req, res, next){

    let uservalue = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        isAdmin: false
    }

    try {
        let createdUser = await userService.createUser(uservalue)
        return res.status(201).json({status: 201, data: createdUser, message: "Successfully Created User"})
    }

    catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "user Creation was Unsuccessful"})
    }
};

exports.getallUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 15;

    try{

        var users = await userService.getallUsers({}, page, limit)

        // Return the users list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: users, message: "Succesfully users Recieved"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
};

exports.authenticateuser = async function(req, res, next) {

    try {
        console.log("Hit the url")
        console.log(req.body.email)
        // console.log(req.session.user)


        await userService.authenticateuser(req.body.email, req.body.password, function (error, user)

        {
            if (error || !user) {
                return res.status(401).json({status: 401, data: error, message: "Wrong email or password."})
            } else {
                req.session.userId = user._id;
                // console.log("After authentication, session is ", req.session.user);
                // console.log("After authentication, session id ", req.session.userId)
                    return res.status(200).json({status: 200, data: user, message: "User found"});
            }
        });


    } catch (e){
        // assert.isNotOk(error,'Promise error');
        // done();
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.getuserdata = async function(req, res, next) {

    try {
        // console.log(req.session.userId)
        await userService.getUserData(req.userId, function (error, user)

        {
            if (error || !user) {
                return res.status(401).json({status: 401, data: error, message: "User not available from controller"})
            } else {
                return res.status(200).json({status: 200, data: user, message: "User found"});
            }
        });


    } catch (e){
        // assert.isNotOk(error,'Promise error');
        // done();
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.userlogout = async function(req, res, next) {

        if (req.session) {
            req.session.destroy(function (err) {
                if(err){
                    return next(err);
                } else {
                    return res.redirect('http://localhost:4200/');
                }
                
            })
        }

}

exports.userupdate = async function(req, res, next) {
    let newuser = new user;
     newuser = req.body.user;
    try {
        let updatedUser = await userService.updateuser(newuser);
        return res.status(201).json({status: 201, data: updatedUser, message: "Succesfully updated User"})
    }

    catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "user update was Unsuccessful"})
    }

}

exports.getsortedusers = async function(req, res, next) {

        try{
            let userall = await userService.sortuserbydate();

            // Return the users list with the appropriate HTTP Status Code and Message.

            return res.status(200).json({status: 200, data: userall, message: "Successfully users sorted"});
        }
        catch(e){

            //Return an Error Response Message with Code and the Error Message.

            return res.status(400).json({status: 400, message: "user sort was Unsuccesful"})
        }

}