import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BridgesGrid from './components/BridgesGrid';

function List() {
  return (
    <div>
      <Navbar active="2" />
      <BridgesGrid />
      <Footer />
    </div>
  );
}

export default List;
