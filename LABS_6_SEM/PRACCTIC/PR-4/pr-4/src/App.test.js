import { render, screen } from '@testing-library/react';
import App from './App';

test('renders table title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /самые длинные мосты россии/i }),
  ).toBeInTheDocument();
});
