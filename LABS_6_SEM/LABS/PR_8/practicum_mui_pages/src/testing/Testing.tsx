import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { quiz } from './quizData';
import Quiz from './features/Quiz';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { clearLists } from './features/quizSlice';

export default function Testing() {
  const lists = useSelector((s: RootState) => s.lists.lists);
  const dispatch = useDispatch();
  const [resetKey, setResetKey] = useState(0);

  const handleCheck = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      const list = lists[i] || [];
      if (q.type === 'M') {
        const ok = q.tasks.every((t, idx) => list[idx] === t.answer);
        if (ok) correct++;
      } else if (q.type === 'S') {
        // compute correct order
        const sorted = q.tasks.slice().sort((a, b) => Number(a.answer) - Number(b.answer)).map((t) => t.question);
        const ok = list.every((it, idx) => it === sorted[idx]);
        if (ok) correct++;
      } else if (q.type === 'C') {
        const trueIdx = q.tasks.findIndex((t) => t.answer === 'true');
        if (list[0] && Number(list[0]) === trueIdx) correct++;
      } else if (q.type === 'MC') {
        const selected = list || [];
        const correctIdx = q.tasks.map((t, i) => (t.answer === 'true' ? String(i) : null)).filter(Boolean) as string[];
        const selSorted = selected.slice().sort();
        const corSorted = correctIdx.slice().sort();
        if (JSON.stringify(selSorted) === JSON.stringify(corSorted)) correct++;
      }
    });
    alert(`Правильных заданий: ${correct} из ${quiz.length}`);
  };

  const handleRestart = () => { dispatch(clearLists()); setResetKey((k) => k + 1); };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Проверь себя</Typography>
          {quiz.map((q, i) => (
            <Quiz key={q.id} index={i} title={q.title} type={q.type} tasks={q.tasks} resetKey={resetKey} />
          ))}

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={handleCheck}>Проверить</Button>
            <Button variant="outlined" onClick={handleRestart}>Начать снова</Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
