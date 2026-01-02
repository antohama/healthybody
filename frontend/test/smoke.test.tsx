import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('app renders', () => {
  render(<App />);
  expect(screen.getByText(/Your personal nutrition/i)).toBeInTheDocument();
});
