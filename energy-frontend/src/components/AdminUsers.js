import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getUsers } from '../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Registered Users</Typography>
            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemText
                            primary={`${user.first_name} ${user.last_name}`}
                            secondary={`National ID: ${user.national_id}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default AdminUsers;
