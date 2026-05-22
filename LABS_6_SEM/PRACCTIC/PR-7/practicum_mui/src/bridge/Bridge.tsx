import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, Link } from 'react-router-dom';
import bridges from '../data';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Bridge() {
  const { id } = useParams();
  const bridgeId = id !== undefined ? parseInt(id, 10) : 1;
  const bridge = bridges.find((item) => item.id === bridgeId) ?? bridges[0];

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ color: '#4a90e2', textDecoration: 'none' }}>
            Главная
          </Link>
          <Typography color="text.primary">{bridge.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {bridge.title}
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src={bridge.img}
            alt={bridge.title}
            sx={{ maxWidth: '100%', maxHeight: 520, objectFit: 'cover' }}
          />
        </Box>
        <Grid container spacing={2}>
          {bridge.description.map((paragraph, i) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                {paragraph}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Bridge;
