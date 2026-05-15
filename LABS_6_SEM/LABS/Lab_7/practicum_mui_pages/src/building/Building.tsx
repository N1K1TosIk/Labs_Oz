import Navbar from "../components/Navbar";
import { useParams, Link } from 'react-router-dom';
import structures from "../data";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Building() {
  const { id } = useParams();
  const index = id !== undefined ? parseInt(id, 10) : 0;
  const safeIndex =
    Number.isFinite(index) && index >= 0 && index < structures.length ? index : 0;
  const building = structures[safeIndex];

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ color: '#5d8aa8', textDecoration: 'none' }}>
            Главная
          </Link>
          <Typography color="text.primary">{building.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {building.title}
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src={building.img}
            alt={building.title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
        <Grid container spacing={2}>
          {building.description.map((paragraph, i) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                {paragraph}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Building;
