import { useState } from 'react';
import './CSS/App.css';
import bridges from './data';
import Table from './components/Table';
import Chart from './components/Chart';

function App() {
  const [chartData, setChartData] = useState(bridges);

  return (
    <div className="App">
      <h3 className="App-title">Самые длинные мосты России</h3>
      <Chart data={chartData} />
      <Table data={bridges} amountRows={10} onDataChange={setChartData} />
    </div>
  );
}

export default App;
