import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid', borderRadius: 2, p: 1 }}>
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>Самые высокие здания и сооружения</Typography>
          <BoxLinks />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function BoxLinks() {
  return (
    <div>
      <Button variant="text" color="info">Главная</Button>
      <Button variant="text" color="info">Список зданий</Button>
      <Button variant="text" color="info">Диаграммы</Button>
      <Button variant="contained" color="info">Проверь себя</Button>
    </div>
  );
}

export default Navbar;
