import { Grid, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import { tTasks } from '../quizData';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAnswer } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
  tasks: tTasks;
  index: number;
  resetKey: number;
  type: 'C' | 'MC';
}

function Choice({ tasks, index, resetKey, type }: ComponentProps) {
  const dispatch = useDispatch();
  const savedAnswers = useSelector((state: RootState) => state.lists.lists[index]);
  const [selected, setSelected] = useState<string[]>(() => savedAnswers || []);

  useEffect(() => {
    setSelected([]);
    dispatch(setSelectedAnswer({ index, items: [] }));
  }, [resetKey, dispatch, index]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (type === 'C') {
      const newSelected = [value];
      setSelected(newSelected);
      dispatch(setSelectedAnswer({ index, items: newSelected }));
    } else {
      let newSelected: string[];
      if (selected.includes(value)) {
        newSelected = selected.filter((s) => s !== value);
      } else {
        newSelected = [...selected, value];
      }
      setSelected(newSelected);
      dispatch(setSelectedAnswer({ index, items: newSelected }));
    }
  };

  if (type === 'C') {
    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <RadioGroup value={selected[0] || ''} onChange={handleChange}>
            {tasks.map((task, idx) => (
              <FormControlLabel
                key={idx}
                value={String(idx)}
                control={<Radio />}
                label={task.question}
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <FormGroup>
          {tasks.map((task, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={selected.includes(String(idx))}
                  onChange={handleChange}
                  value={String(idx)}
                />
              }
              label={task.question}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default Choice;
