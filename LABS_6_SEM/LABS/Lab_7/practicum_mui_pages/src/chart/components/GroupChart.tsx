import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import type { tGroup } from '../groupdata';
import SettingChart, { type tSeries } from './SettingChart';

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter((item) => item[1] === true)
    .map((item) => ({ dataKey: item[0], label: item[0] }));

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
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
