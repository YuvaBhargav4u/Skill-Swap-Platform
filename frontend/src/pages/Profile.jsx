import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profilePhoto: '',
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    isPublic: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token
      await axios.post('http://localhost:5000/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Profile saved!')
    } catch (err) {
      console.error(err)
      alert('Error saving profile')
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token
        const { data } = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setFormData({
          name: data.name || '',
          location: data.location || '',
          profilePhoto: data.profilePhoto || '',
          skillsOffered: data.skillsOffered?.join(', ') || '',
          skillsWanted: data.skillsWanted?.join(', ') || '',
          availability: data.availability || '',
          isPublic: data.isPublic ?? true
        })
      } catch (err) {
        console.error(err)
        // Optional: alert('No existing profile found')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Edit Profile</h2>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={styles.input} />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location (optional)" style={styles.input} />
        <input name="profilePhoto" value={formData.profilePhoto} onChange={handleChange} placeholder="Photo URL (optional)" style={styles.input} />
        <input name="skillsOffered" value={formData.skillsOffered} onChange={handleChange} placeholder="Skills Offered (comma separated)" style={styles.input} />
        <input name="skillsWanted" value={formData.skillsWanted} onChange={handleChange} placeholder="Skills Wanted (comma separated)" style={styles.input} />
        <input name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability (e.g. weekends)" style={styles.input} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            id="isPublic"
          />
          <label htmlFor="isPublic">Make profile public</label>
        </div>

        <button type="submit" style={styles.button}>Save Profile</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: 400
  },
  input: {
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5
  },
  button: {
    padding: 10,
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: 5
  }
}

export default Profile
