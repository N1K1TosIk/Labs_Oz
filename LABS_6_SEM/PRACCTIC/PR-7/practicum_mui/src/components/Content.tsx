import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IMG } from '../constants/images';

const btnSx = { bgcolor: '#4a90e2', '&:hover': { bgcolor: '#3a7bc8' } };

const circles = [
  { src: IMG.russki, alt: 'Русский мост', title: 'Русский мост', text: 'Вантовый мост во Владивостоке', to: '/bridge/2' },
  { src: IMG.krim, alt: 'Крымский мост', title: 'Крымский мост', text: 'Соединяет Крым с материковой Россией', to: '/bridge/1' },
  { src: IMG.president, alt: 'Мост Президента', title: 'Мост Президента', text: 'Вантовый мост в Ульяновске', to: '/bridge/10' },
  { src: IMG.obuhovski, alt: 'Большой Обуховский мост', title: 'Большой Обуховский', text: 'Вантовый мост в Санкт-Петербурге', to: '/bridge/3' },
];

const rightCards = [
  {
    img: IMG.golden,
    alt: 'Золотой мост',
    title: 'Золотой мост',
    text: 'Вантовый мост через бухту Золотой Рог во Владивостоке. Открыт в 2012 году к саммиту АТЭС.',
    to: '/bridge/20',
  },
  {
    img: IMG.president,
    alt: 'Мост Президента',
    title: 'Мост Президента',
    text: 'Самый длинный мост в Ульяновске через реку Волга, построенный в 2009 году.',
    to: '/bridge/10',
  },
  {
    img: IMG.amur,
    alt: 'Амурский мост',
    title: 'Амурский мост',
    text: 'Железнодорожный мост через реку Амур, соединяющий берега у Хабаровска.',
    to: '/bridge/4',
  },
];

function Content() {
  return (
    <Container maxWidth="lg" component="main" sx={{ py: 5 }}>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {circles.map((c) => (
          <Grid key={c.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                component={Link}
                to={c.to}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'block',
                }}
              >
                <Box component="img" src={c.src} alt={c.alt} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography sx={{ fontWeight: 'bold' }}>{c.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {c.text}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: '2px solid #333' }}>
            <Box component="img" src={IMG.toliatti} alt="Мост в Тольятти" sx={{ width: '100%', display: 'block' }} />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Мостостроение в России
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Россия обладает богатой историей мостостроения. На территории страны построены уникальные мостовые сооружения, которые
                соединяют различные регионы и способствуют развитию транспортной инфраструктуры.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={Link} to="/list" variant="contained" sx={btnSx}>
                  Подробнее
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
              История строительства
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Мосты России строились на протяжении многих веков. Современные технологии позволяют создавать уникальные конструкции, способные
              выдерживать экстремальные нагрузки и погодные условия.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Вантовые и висячие мосты стали символом технического прогресса страны.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to="/charts" variant="contained" sx={btnSx}>
                Подробнее
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            {rightCards.map((item) => (
              <Box key={item.title} sx={{ border: '2px solid #333', p: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.alt}
                    sx={{ width: { xs: '100%', sm: 120 }, flexShrink: 0, display: 'block' }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.text}
                    </Typography>
                    <Button component={Link} to={item.to} variant="contained" size="small" sx={btnSx}>
                      Подробнее
                    </Button>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
