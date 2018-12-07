
let user = require("../models/users.model");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');


// Saving the context of this module inside the _the variable
_this = this

exports.createUser = async function(uservalue){

let encryptpassword = cryptr.encrypt(uservalue.password);

    let newUser = new user({

        email: uservalue.email,
        password: encryptpassword,
        firstName: uservalue.firstName,
        // lastName: uservalue.lastName,
        // buyingpower: uservalue.buyingpower,
        // recommened: uservalue.recommened,
        // followers: uservalue.followers,
        // following: uservalue.following,
        // ssn: uservalue.ssn,
        isAdmin: false
    })

    try{

        // Saving the user
        let savedUser = await newUser.save()

        return savedUser;
    }catch(e){

        // return a Error message describing the reason
        throw Error("Error while Creating USer")
    }
}

exports.getallUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error

    try {
        let allusers = await user.paginate(query, options)

        // Return the user list that was retured by the mongoose promise
        return allusers;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating users')
    }
}




exports.authenticateuser = function(email, password, callback) {
    user.findOne({ email: email})
        .exec(function (err, userfound) {
            if (err) {
                return callback(err)
            } else if (!userfound) {
                var err = new Error('User not found.');
                err.status = 401;
                console.log("You just wrote me");
                return callback(err);
            }
                if(cryptr.decrypt(userfound.password).toString().trim() === password.trim()){
                return callback(null, userfound);

                } else {
                    return callback();
                }

        });
}

exports.getUserData = function(userid, callback) {
    user.findOne({_id: userid})
        .exec(function (err, userdata) {
            if (err) {
                return callback(err)
            } else if (!userdata) {
                var err = new Error("User not found") ;
                err.status = 401;
                return callback(err);
            }
               return callback(null, userdata)

        });
}


exports.updateuser = async function(userdata){
    var id = userdata.id;

    try{
        var olduser = await user.findOne({_id: id});

        olduser.firstName = userdata.firstName;
        // olduser.lastName = userdata.lastName;
        // olduser.buyingpower = userdata.buyingpower;
        // olduser.ssn = userdata.ssn;
        olduser.portfolio = userdata.portfolio;


        let saveduser = await olduser.save();
        return saveduser;
    } catch(e){
        throw Error("While updating");
    }
}

// exports.updateportfolio = async function(userdata){
//     var id = userdata._id;
//     try{
//         var olduser = await user.findById(id);
//
//         o
//     }
//
// }

exports.sortuserbydate = async function(req, res){
    try{
        var allusers = await user.find().sort({dateCreated: -1})
        return allusers;
    } catch (e){
        throw Error("While Sorting");
    }
}