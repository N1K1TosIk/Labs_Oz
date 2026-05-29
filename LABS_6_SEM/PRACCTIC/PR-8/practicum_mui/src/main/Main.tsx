import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Content from '../components/Content';
import Footer from '../components/Footer';

function Main() {
  return (
    <>
      <CssBaseline />
      <Navbar active="1" />
      <Gallery />
      <Content />
      <Footer />
    </>
  );
}

export default Main;
