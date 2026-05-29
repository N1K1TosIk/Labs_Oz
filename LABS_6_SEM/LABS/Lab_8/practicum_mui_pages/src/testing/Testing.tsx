import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Quiz from './features/Quiz';
import { quiz } from './quizData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearLists } from './features/quizSlice';

function Testing() {
  const [results, setResults] = useState<string[] | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);

  const handleCheck = () => {
    const out: string[] = [];
    quiz.forEach((item, index) => {
      let correct = 0;
      if (item.type === 'M') {
        const currentAnswers = lists[index] ?? item.tasks.map((t) => t.answer);
        currentAnswers.forEach((answer, i) => {
          if (answer === item.tasks[i].answer) correct += 1;
        });
      } else if (item.type === 'S') {
        const currentOrder = lists[index] ?? item.tasks.map((t) => t.question);
        const correctOrder = item.tasks
          .slice()
          .sort((a, b) => Number(a.answer) - Number(b.answer))
          .map((t) => t.question);
        currentOrder.forEach((q, i) => {
          if (q === correctOrder[i]) correct += 1;
        });
      }
      if (correct === item.tasks.length) {
        out.push(`Задание ${index + 1}. Все ответы верные.`);
      } else {
        out.push(`Задание ${index + 1}. Верных ответов: ${correct}.`);
      }
    });
    setResults(out);
  };

  const handleRestart = () => {
    setResults(null);
    setResetKey((prev) => prev + 1);
    dispatch(clearLists());
  };

  return (
    <div>
      <Navbar active="4" />
      <Box sx={{ maxWidth: 960, m: '24px auto 12px', p: 2 }}>
        <Quiz onCheck={handleCheck} onRestart={handleRestart} resetKey={resetKey} />
        {results && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h5">Результаты теста</Typography>
            {results.map((r, i) => (
              <Typography key={i} variant="body1">{r}</Typography>
            ))}
          </Box>
        )}
      </Box>
      <Footer />
    </div>
  );
}

export default Testing;
