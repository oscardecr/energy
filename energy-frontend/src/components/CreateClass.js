import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const CreateClass = () => {
    const [formData, setFormData] = useState({
        day: '',
        hour: ''
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
            const response = await axios.post('http://127.0.0.1:8000/classes/', formData);
            console.log('Class created successfully', response.data);
        } catch (error) {
            console.error('Error creating class', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Create Class</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="day"
                    label="Day"
                    type="date"
                    value={formData.day}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="hour"
                    label="Hour"
                    type="time"
                    value={formData.hour}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Class
                </Button>
            </form>
        </Container>
    );
};

export default CreateClass;
