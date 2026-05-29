import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { tTasks } from '../quizData';
import SortableList from './SortableList';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps {
  tasks: tTasks;
  index: number;
  resetKey: number;
  type: 'M' | 'S';
}

function shuffleAnswers(items: string[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function Matching({ tasks, index, resetKey, type }: ComponentProps) {
  const dispatch = useDispatch();
  const initialItems = type === 'S' ? tasks.map((t) => t.question) : tasks.map((t) => t.answer);
  const [answers, setAnswers] = useState<string[]>(() => shuffleAnswers(initialItems));

  useEffect(() => {
    const shuffled = shuffleAnswers(initialItems);
    setAnswers(shuffled);
    // add list to store for this quiz index
    dispatch(addList({ index, items: shuffled }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, index, resetKey]);

  if (type === 'S') {
    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <SortableList index={index} answers={answers} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <List>
          {tasks.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;
