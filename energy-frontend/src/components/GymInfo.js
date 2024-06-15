import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const GymInfo = () => {
    return (
        <Container>
            <Paper elevation={3} style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                <Box p={3}>
                    <Typography variant="h4" gutterBottom>Energy's Gym Information</Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to Energy's Gym! Our gym offers a wide range of facilities and classes to help you stay fit and healthy.
                        We have state-of-the-art equipment, experienced trainers, and a variety of classes to suit all fitness levels.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our facilities include:
                        <ul>
                            <li>Cardio machines</li>
                            <li>Weight training equipment</li>
                            <li>Free weights</li>
                            <li>Yoga and Pilates studios</li>
                            <li>Swimming pool</li>
                            <li>Sauna and steam rooms</li>
                        </ul>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We offer the following classes:
                        <ul>
                            <li>Yoga</li>
                            <li>Pilates</li>
                            <li>Spinning</li>
                            <li>Aerobics</li>
                            <li>Strength training</li>
                            <li>HIIT</li>
                        </ul>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our opening hours are:
                        <ul>
                            <li>Monday to Friday: 5:00 AM - 10:00 PM</li>
                            <li>Saturday: 8:00 AM - 6:00 PM</li>
                            <li>Sunday: 9:00 AM - 5:00 PM</li>
                        </ul>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Come and visit us to start your fitness journey today!
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default GymInfo;
