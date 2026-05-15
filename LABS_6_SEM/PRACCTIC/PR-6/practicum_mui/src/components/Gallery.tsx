import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { IMG } from '../constants/images';

const coverImg = {
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover' as const,
};

function Gallery() {
  return (
    <Container maxWidth="lg" sx={{ my: 2.5 }}>
      <Grid
        container
        spacing={0}
        sx={{
          overflow: 'hidden',
          height: { xs: 'auto', md: 360 },
        }}
      >
        <Grid size={{ xs: 12, md: 8 }} sx={{ height: { xs: 220, md: 252 }, overflow: 'hidden' }}>
          <Box component="img" src={IMG.russki} alt="Русский мост" sx={coverImg} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{ height: { xs: 160, md: 252 } }}>
          <Stack direction={{ xs: 'row', md: 'column' }} sx={{ height: '100%' }}>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Box component="img" src={IMG.krim} alt="Крымский мост" sx={coverImg} />
            </Box>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Box component="img" src={IMG.obuhovski} alt="Большой Обуховский мост" sx={coverImg} />
            </Box>
          </Stack>
        </Grid>

        <Grid size={12} sx={{ height: { xs: 140, md: 108 }, overflow: 'hidden' }}>
          <Box component="img" src={IMG.amur} alt="Амурский мост" sx={coverImg} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Gallery;
