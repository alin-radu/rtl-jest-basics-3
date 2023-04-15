import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', async () => {
  const mockFn = jest.fn();
  render(<UserForm onUserAdd={mockFn} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  await user.click(nameInput);
  await user.keyboard('Alin');

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  await user.click(emailInput);
  await user.keyboard('test@test.io');

  const button = screen.getByRole('button');
  await user.click(button);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith({
    name: 'Alin',
    email: 'test@test.io',
  });
});

test('empties the two inputs when form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  await user.click(nameInput);
  await user.keyboard('Alin');

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  await user.click(emailInput);
  await user.keyboard('test@test.io');

  const button = screen.getByRole('button');
  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
