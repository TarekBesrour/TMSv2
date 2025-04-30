import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tableau de Bord TMS
        </Typography>
        <Typography variant="body1">
          Bienvenue sur votre espace de gestion logistique.
        </Typography>
        {/* Ici, vous ajouterez plus tard des graphiques, tableaux, etc. */}
      </Box>
    </Container>
  );
}