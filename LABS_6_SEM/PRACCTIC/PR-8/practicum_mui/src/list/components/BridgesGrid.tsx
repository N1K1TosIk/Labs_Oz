import bridgeRows from '../table';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        p: 1.5,
        gap: 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: '#fafafa',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
          Настройка списка мостов
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
      </Box>
      <Box sx={{ minWidth: { xs: '100%', sm: 260 } }}>
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
}

function BridgesGrid() {
  const rows: GridRowsProp = bridgeRows;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Регион', flex: 0.8 },
    { field: 'Год открытия' },
    { field: 'Длина, км' },
    { field: 'Тип', flex: 0.8 },
    { field: 'Пропускная способность (тыс. авто/сутки)', flex: 0.8 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
      <DataGrid
        localeText={{
          ...ruRU.components.MuiDataGrid.defaultProps.localeText,
          toolbarColumns: 'Вывод столбцов',
          toolbarFilters: 'Фильтрация',
          toolbarDensity: 'Размер строк',
          toolbarExport: 'Сохранить',
          toolbarQuickFilterPlaceholder: 'Поиск моста',
        }}
        rows={rows}
        columns={columns}
        slots={{ toolbar: CustomToolbar }}
      />
    </Container>
  );
}

export default BridgesGrid;
