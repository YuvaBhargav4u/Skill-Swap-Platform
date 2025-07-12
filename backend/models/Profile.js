//backend/models/Profile.js

const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
},
name: String,
location: String,
profilePhoto: String,
skillsOffered: [String],
skillsWanted: [String],
availability: String,
isPublic: {
type: Boolean,
default: true
}
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)