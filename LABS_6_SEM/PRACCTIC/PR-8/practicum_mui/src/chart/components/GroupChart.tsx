import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import SettingChart, { type tSeries } from './SettingChart';
import type { tGroup } from '../groupdata';

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная длина': true,
    'Минимальная длина': false,
    'Максимальная пропускная способность': false,
    'Минимальная пропускная способность': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter((item) => item[1] === true)
    .map((item) => ({ dataKey: item[0], label: item[0] }));

  const chartSetting = {
    yAxis: [{ label: 'Значение' }],
    height: 400,
  };

  const legendSlotProps = {
    legend: {
      position: { vertical: 'bottom', horizontal: 'center' },
    },
  } as const;

  const oneSeries = seriesY.length === 1;

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={legendSlotProps}
          {...(oneSeries ? { barLabel: 'value' as const } : {})}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={legendSlotProps}
          {...chartSetting}
        />
      )}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
}

export default GroupChart;
