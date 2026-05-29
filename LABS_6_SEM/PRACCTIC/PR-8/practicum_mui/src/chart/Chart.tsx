import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import { regions, years } from './groupdata';

type tSelect = 'Регион' | 'Год открытия';

function Chart() {
  const [group, setGroup] = React.useState<tSelect>('Регион');
  const [groupData, setGroupData] = React.useState(regions);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    setGroupData(value === 'Регион' ? regions : years);
  };

  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width: '240px', m: '20px auto' }}>
        <FormControl fullWidth>
          <InputLabel> Значение по оси ОХ </InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Значение по оси ОХ"
            onChange={handleChange}
          >
            <MenuItem value="Регион"> Регион </MenuItem>
            <MenuItem value="Год открытия"> Год открытия </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />
      <Footer />
    </div>
  );
}

export default Chart;
