import { useState } from 'react';
import './CSS/App.css';
import buildings from './data';
import Table from './components/Table';
import Chart from './components/Chart';

function App() {
  const [chartData, setChartData] = useState(buildings);

  return (
    <div className="App">
      <h3 className="App-title">Самые высокие здания и сооружения</h3>
      <Chart data={chartData} />
      <Table data={buildings} amountRows={15} onDataChange={setChartData} />
    </div>
  );
}

export default App;
