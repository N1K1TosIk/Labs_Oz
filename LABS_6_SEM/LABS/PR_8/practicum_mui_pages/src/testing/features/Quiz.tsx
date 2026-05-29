import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Matching from './Matching';
import { tTasks } from '../quizData';

interface QuizProps { index: number; title: string; type: string; tasks: tTasks; resetKey: number }

export default function Quiz({ index, title, type, tasks, resetKey }: QuizProps) {
  return (
    <Box sx={{ border: '1px solid #ddd', p: 2, mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Matching index={index} type={type} tasks={tasks} resetKey={resetKey} />
    </Box>
  );
}
