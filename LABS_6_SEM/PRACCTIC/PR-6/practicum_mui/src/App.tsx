import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Gallery />
      <Content />
      <Footer />
    </>
  );
}

export default App;
