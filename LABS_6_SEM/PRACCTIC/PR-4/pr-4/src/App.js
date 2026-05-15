import './CSS/App.css';
import bridges from './data';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <h3 className="App-title">Самые длинные мосты России</h3>
      <Table data={bridges} amountRows={10} />
    </div>
  );
}

export default App;
