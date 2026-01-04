vi.mock('../../src/api/weight', () => ({
  addWeight: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddWeightForm } from '../../src/components/AddWeightForm';
import { addWeight } from '../../src/api/weight';

function setup() {
  render(<AddWeightForm />);

  const weightInput = screen.getByLabelText('weight');
  const submitButton = screen.getByRole('button', { name: 'Add' });

  return {
    weightInput,
    submitButton,
    user: userEvent.setup(),
  };
}

describe('AddWeightForm', () => {
  const mockedAddWeight = vi.mocked(addWeight);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { weightInput, submitButton } = setup();

    expect(weightInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submits weight and shows success', async () => {
    mockedAddWeight.mockResolvedValue({ value: 80 });

    const { weightInput, submitButton, user } = setup();

    await user.type(weightInput, '80');
    await user.click(submitButton);

    expect(addWeight).toHaveBeenCalledWith({ value: 80 });
    expect(await screen.findByText('Saved')).toBeInTheDocument();
  });

  it('shows error on API failure', async () => {
    mockedAddWeight.mockRejectedValue(new Error('fail'));

    const { weightInput, submitButton, user } = setup();

    await user.type(weightInput, '80');
    await user.click(submitButton);

    expect(await screen.findByText('Error')).toBeInTheDocument();
  });

  it('disables submit if weight is empty', async () => {
    const { submitButton, user } = setup();

    expect(submitButton).toBeDisabled();

    await user.click(submitButton);

    expect(addWeight).not.toHaveBeenCalled();
  });
});
