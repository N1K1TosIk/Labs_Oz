import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import type { tGroup } from '../groupdata';

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: 'Группа', headerName: 'Группа', flex: 1 },
    { field: 'Минимальная длина', flex: 0.5 },
    { field: 'Максимальная длина', flex: 0.5 },
    { field: 'Минимальная пропускная способность', flex: 0.7 },
    { field: 'Максимальная пропускная способность', flex: 0.7 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
      />
    </Container>
  );
}

export default GroupGrid;
