import { useState } from "react";
import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const groups = ['Страна', 'Высота', 'Тип'] as const;
const groupItems = {
  Страна: ['ОАЭ', 'Япония', 'США'],
  Высота: ['Более 600 м', '300–600 м', 'Менее 300 м'],
  Тип: ['Небоскрёб', 'Телебашня', 'Мечеть'],
};

type GroupType = typeof groups[number];

function Main() {
  const [group, setGroup] = useState<GroupType>('Страна');

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as GroupType);
  };

  return (
    <div>
      <Navbar active="1" />
      <Box sx={{ maxWidth: 600, m: '24px auto 12px', p: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="group-select-label">Группировка</InputLabel>
          <Select
            labelId="group-select-label"
            value={group}
            label="Группировка"
            onChange={handleChange}
          >
            {groups.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ maxWidth: 600, m: '0 auto 24px' }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Текущая группа: {group}
            </Typography>
            <Typography variant="body1" gutterBottom>
              В этой группе показано {groupItems[group].length} элемента.
            </Typography>
            <Typography variant="body2">
              {groupItems[group].map((item) => `• ${item}`).join(' ')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Gallery />
      <Content />
      <Footer />
    </div>
  );
}

export default Main;
