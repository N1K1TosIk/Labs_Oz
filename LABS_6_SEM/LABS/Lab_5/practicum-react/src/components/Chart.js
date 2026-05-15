import { useState } from 'react';
import * as d3 from 'd3';
import ChartDraw from './ChartDraw';

const Chart = (props) => {
  const [ox, setOx] = useState('Страна');
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState('Точечная диаграмма');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const nextOy = [form.oy[0].checked, form.oy[1].checked];

    if (!nextOy[0] && !nextOy[1]) {
      setOy([false, false]);
      setError('Выберите минимум одно значение по оси OY.');
      return;
    }

    setError('');
    setOx(form.ox.value);
    setOy(nextOy);
    setChartType(form.chartType.value);
  };

  const handleOyChange = () => {
    if (error) {
      setError('');
    }
  };

  const createArrGraph = (data, key) => {
    const grouped = d3.group(data, (d) => d[key]);
    const arrGraph = [];

    for (const entry of grouped) {
      const minMax = d3.extent(entry[1].map((d) => d['Высота']));
      arrGraph.push({ labelX: entry[0], values: minMax });
    }

    if (key === 'Год') {
      arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
    }

    return arrGraph;
  };

  return (
    <div className="chart-panel">
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ox === 'Страна'} />
          Страна
          <br />
          <input type="radio" name="ox" value="Год" defaultChecked={ox === 'Год'} />
          Год
        </div>
        <p>Значение по оси OY</p>
        <div>
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[0] === true}
            onChange={handleOyChange}
          />
          Максимальная высота
          <br />
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[1] === true}
            onChange={handleOyChange}
          />
          Минимальная высота
        </div>
        <p>
          <label>Тип диаграммы </label>
          <select name="chartType" defaultValue={chartType}>
            <option>Точечная диаграмма</option>
            <option>Гистограмма</option>
          </select>
        </p>
        <p>
          <button type="submit">Построить</button>
        </p>
      </form>
      {error && <p className="chart-error">{error}</p>}
      <ChartDraw data={createArrGraph(props.data, ox)} oy={oy} chartType={chartType} />
    </div>
  );
};

export default Chart;
