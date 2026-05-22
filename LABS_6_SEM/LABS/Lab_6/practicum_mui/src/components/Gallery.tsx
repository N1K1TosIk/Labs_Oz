import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';
import structures from "../../data";

const imgData = structures.slice(0, -1);

function Gallery() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto' }}>
        <ImageList
          variant="quilted"
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr) !important',
              sm: 'repeat(2, 1fr) !important',
              md: 'repeat(3, 1fr) !important',
              lg: 'repeat(4, 1fr) !important',
            },
          }}
          gap={8}
        >
          {imgData.map((item, index) => (
            <ImageListItem key={item.img}>
              <Link to={"/building/" + index}>
                <img
                  srcSet={item.img}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default Gallery;