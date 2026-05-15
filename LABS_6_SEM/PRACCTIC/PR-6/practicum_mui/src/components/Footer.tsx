import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#333',
        color: 'white',
        textAlign: 'center',
        py: '20px',
        mt: '40px',
      }}
    >
      <Typography component="p" sx={{ m: 0 }}>
        2025 год | Группа Б9123-09.03.04(3) | Сяськин Н.С.
      </Typography>
    </Box>
  );
}

export default Footer;
