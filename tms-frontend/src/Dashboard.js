import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users') // backend local
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erreur API :', error));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tableau de Bord TMS
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bienvenue sur votre espace de gestion logistique.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Liste des utilisateurs :
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
