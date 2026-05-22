import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const ACTIVE_BLUE = '#4a90e2';
const ACTIVE_BLUE_HOVER = '#3a7bc8';

const activeTabSx = {
  bgcolor: ACTIVE_BLUE,
  color: '#fff',
  border: `2px solid ${ACTIVE_BLUE}`,
  '&:hover': { bgcolor: ACTIVE_BLUE_HOVER, borderColor: ACTIVE_BLUE_HOVER },
};

const menuLinks = [
  { label: 'Самые длинные мосты', to: '/', active: '1' },
  { label: 'Список мостов', to: '/list', active: '2' },
  { label: 'Диаграммы', to: '/charts', active: '3' },
];

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#f5f5f5',
        color: '#333',
        borderBottom: '2px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', px: 1 }}>
            Мосты России
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                variant="text"
                disableElevation
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '16px',
                  px: '25px',
                  py: '12px',
                  ...(active === item.active ? activeTabSx : { color: '#333' }),
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="меню"
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 260, pt: 2 }}>
          {menuLinks.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.to}
              selected={active === item.active}
              onClick={() => setOpen(false)}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 1,
                ...(active === item.active
                  ? {
                      ...activeTabSx,
                      '&.Mui-selected': {
                        bgcolor: ACTIVE_BLUE,
                        color: '#fff',
                      },
                      '&.Mui-selected:hover': {
                        bgcolor: ACTIVE_BLUE_HOVER,
                      },
                    }
                  : {}),
              }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: { sx: { fontWeight: 'bold', ...(active === item.active ? { color: '#fff' } : {}) } },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
