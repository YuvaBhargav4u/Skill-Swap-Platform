// frontend/src/pages/Login.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate()

const handleSubmit = async (e) => {
e.preventDefault()
setError('')
try {
const { data } = await axios.post('http://localhost:5000/api/auth/login', {
email,
password
})
localStorage.setItem('userInfo', JSON.stringify(data))
navigate('/')
} catch (err) {
setError(err.response?.data?.message || 'Login failed')
}
}

return (
<div style={styles.container}>
<form onSubmit={handleSubmit} style={styles.form}>
<h2>Skill Swap Login</h2>
{error && <p style={styles.error}>{error}</p>}
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={styles.input}
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
style={styles.input}
/>
<button type="submit" style={styles.button}>Log In</button>
<a href="#" style={styles.link}>Forgot password?</a>
</form>
</div>
)
}

const styles = {
container: {
height: '100vh',
background: '#f0f2f5',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
},
form: {
background: '#fff',
padding: 30,
borderRadius: 10,
boxShadow: '0 0 10px rgba(0,0,0,0.1)',
width: 350,
display: 'flex',
flexDirection: 'column',
gap: 15
},
input: {
padding: 10,
borderRadius: 5,
border: '1px solid #ccc'
},
button: {
padding: 10,
borderRadius: 5,
backgroundColor: '#007bff',
color: '#fff',
border: 'none',
cursor: 'pointer'
},
link: {
textAlign: 'center',
marginTop: 10,
fontSize: 14,
color: '#007bff'
},
error: {
color: 'red',
fontSize: 14
}
}

export default Login