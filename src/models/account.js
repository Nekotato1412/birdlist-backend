const Mongoose = require('mongoose')

const accountSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 64
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64
    },
    profile: {
        avatarURL: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 10
        },
        description: {
            type: String,
            default: "",
            maxlength: 2000
        },
    },
    characters: {
        type: Array,
        default: [],
        maxlength: 500
    },
    meta: {
        creationDate: {
            type: String,
            required: true,
            minlength: 4
        },
        lastLogin: {
            type: String,
            minlength: 4
        }
    }
})

const accountModel = Mongoose.model("account", accountSchema)

module.exports = accountModel

