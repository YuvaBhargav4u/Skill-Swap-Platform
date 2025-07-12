const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const { protect } = require('../middleware/authMiddleware')

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      location,
      profilePhoto,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic
    } = req.body

    const profileData = {
      user: req.user._id,
      name,
      location,
      profilePhoto,
      skillsOffered: Array.isArray(skillsOffered)
        ? skillsOffered
        : skillsOffered.split(',').map(s => s.trim()),
      skillsWanted: Array.isArray(skillsWanted)
        ? skillsWanted
        : skillsWanted.split(',').map(s => s.trim()),
      availability,
      isPublic
    }

    let profile = await Profile.findOne({ user: req.user._id })

    if (profile) {
      // update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        profileData,
        { new: true }
      )
    } else {
      // create new profile
      profile = await Profile.create(profileData)
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id })

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
