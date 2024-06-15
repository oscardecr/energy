import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        national_id: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://energy-e6xp.onrender.com/users/register/', formData);
            console.log('User registered successfully', response.data);
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                <Box p={3}>
                    <Typography variant="h4">Register User</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="first_name"
                            label="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { color: '#ffffff' }
                            }}
                            InputProps={{
                                style: { color: '#ffffff' }
                            }}
                        />
                        <TextField
                            name="last_name"
                            label="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { color: '#ffffff' }
                            }}
                            InputProps={{
                                style: { color: '#ffffff' }
                            }}
                        />
                        <TextField
                            name="national_id"
                            label="National ID"
                            value={formData.national_id}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { color: '#ffffff' }
                            }}
                            InputProps={{
                                style: { color: '#ffffff' }
                            }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { color: '#ffffff' }
                            }}
                            InputProps={{
                                style: { color: '#ffffff' }
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                    </form>
                </Box>
            </Paper>
            </Container>

);
};

export default RegisterUser;
