var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    // lastName: String,
    portfolio: [],
    // buyingpower: Number,
    // recommended: [],
    // followers: [],
    // following: [],
    // ssn: Number,
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
})

userSchema.plugin(mongoosePaginate)
const users = mongoose.model('users',userSchema)

module.exports = users;