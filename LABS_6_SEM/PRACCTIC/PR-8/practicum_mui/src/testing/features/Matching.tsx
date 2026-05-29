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
  type: 'M' | 'S' | 'C' | 'MC';
}

function shuffleAnswers(items: string[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function Matching({ tasks, index, resetKey, type }: ComponentProps) {
  const dispatch = useDispatch();
  const initialItems = (type === 'S' || type === 'M') ? tasks.map((t) => t.question) : tasks.map((t) => t.answer);
  const [answers, setAnswers] = useState<string[]>(() => shuffleAnswers(initialItems));

  useEffect(() => {
    const shuffled = shuffleAnswers(initialItems);
    setAnswers(shuffled);
    if (type === 'S' || type === 'M') {
      dispatch(addList({ index, items: shuffled }));
    }
  }, [dispatch, index, resetKey, type]);

  if (type === 'S' || type === 'M') {
    return (
      <Grid container spacing={2}>
        {type === 'M' && (
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
        )}
        <Grid size={type === 'M' ? { xs: 12, md: 6 } : 12}>
          <SortableList index={index} answers={answers} />
        </Grid>
      </Grid>
    );
  }

  return null;
}

export default Matching;
