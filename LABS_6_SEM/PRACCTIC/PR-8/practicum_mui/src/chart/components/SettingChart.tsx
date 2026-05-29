import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export type tSeries = {
  'Максимальная длина': boolean;
  'Минимальная длина': boolean;
  'Максимальная пропускная способность': boolean;
  'Минимальная пропускная способность': boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === 'bar');
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: '20px 0', justifyContent: 'center' }}
    >
      <FormControl>
        <FormLabel id="label-radio-group">
          Тип диаграммы:
        </FormLabel>
        <RadioGroup
          name="group-radio"
          value={isBar ? 'bar' : 'dot'}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
          <FormControlLabel value="dot" control={<Radio />} label="Линейная" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-checkbox-group">
          На диаграмме показать:
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Максимальная длина']}
              onChange={handleChange}
              name="Максимальная длина"
            />
          }
          label="максимальную длину моста"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Минимальная длина']}
              onChange={handleChange}
              name="Минимальная длина"
            />
          }
          label="минимальную длину моста"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Максимальная пропускная способность']}
              onChange={handleChange}
              name="Максимальная пропускная способность"
            />
          }
          label="максимальную пропускную способность"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series['Минимальная пропускная способность']}
              onChange={handleChange}
              name="Минимальная пропускная способность"
            />
          }
          label="минимальную пропускную способность"
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
