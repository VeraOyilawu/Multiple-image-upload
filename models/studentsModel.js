const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    profile: {
        type: String,
        required: true
    }
}, {timestamps: true})

const studentModel = mongoose.model("studentDetails", studentSchema)

module.exports = studentModel