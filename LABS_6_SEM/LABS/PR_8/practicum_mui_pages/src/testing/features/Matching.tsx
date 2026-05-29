import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setDraggedItems } from './quizSlice';
import { useDispatch } from 'react-redux';
import SortableList from './SortableList';
import { addList } from './quizSlice';
import { tTasks } from '../quizData';

interface MatchingProps { index: number; type: string; tasks: tTasks; resetKey: number }

export default function Matching({ index, type, tasks, resetKey }: MatchingProps) {
  const dispatch = useDispatch();

  const initialItems = useMemo(() => {
    if (type === 'S') return tasks.map((q) => q.question);
    if (type === 'M') return shuffle(tasks.map((t) => t.answer));
    if (type === 'C' || type === 'MC') return tasks.map((t) => t.question);
    return tasks.map((t) => t.question);
  }, [type, tasks, resetKey]);

  // dispatch initial list
  React.useEffect(() => { dispatch(addList({ index, items: initialItems })); }, [initialItems]);

  if (type === 'S' || type === 'M') {
    return (
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Typography>Вопросы</Typography>
          <List>
            {tasks.map((t) => (
              <ListItem key={t.question}><ListItemText primary={t.question} /></ListItem>
            ))}
          </List>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>Ответы (перетащите)</Typography>
          <SortableList index={index} items={initialItems} />
        </Grid>
      </Grid>
    );
  }

  if (type === 'C') {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      dispatch(setDraggedItems({ index, items: [v] }));
    };
    return (
      <Box>
        <RadioGroup onChange={handleChange}>
          {tasks.map((t, i) => (
            <FormControlLabel key={i} control={<Radio />} label={t.question} value={String(i)} />
          ))}
        </RadioGroup>
      </Box>
    );
  }

  if (type === 'MC') {
    const [selected, setSelected] = React.useState<string[]>([]);
    const toggle = (v: string) => {
      setSelected((s) => {
        const next = s.includes(v) ? s.filter((x) => x !== v) : [...s, v];
        dispatch(setDraggedItems({ index, items: next }));
        return next;
      });
    };
    return (
      <Box>
        {tasks.map((t, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox onChange={() => toggle(String(i))} />}
            label={t.question}
            value={String(i)}
          />
        ))}
      </Box>
    );
  }

  return null;
}

function shuffle(arr: string[]) { return arr.slice().sort(() => Math.random() - 0.5); }
