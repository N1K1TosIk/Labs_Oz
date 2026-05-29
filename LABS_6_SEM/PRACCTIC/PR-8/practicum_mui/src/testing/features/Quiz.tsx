import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from '../quizData';
import Matching from './Matching';
import Choice from './Choice';

interface QuizProps {
  onCheck: () => void;
  onRestart: () => void;
  resetKey: number;
}

function Quiz({ onCheck, onRestart, resetKey }: QuizProps) {
  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>
          {(item.type === 'M' || item.type === 'S') && (
            <Matching tasks={item.tasks} index={index} resetKey={resetKey} type={item.type} />
          )}
          {(item.type === 'C' || item.type === 'MC') && (
            <Choice tasks={item.tasks} index={index} resetKey={resetKey} type={item.type} />
          )}
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant="contained" onClick={onCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={onRestart}>
          Начать снова
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;
