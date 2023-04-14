/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// import { render, screen, within } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

import UserList from './UserList';

const renderComponent = () => {
  const users = [
    { name: 'jane', email: 'jane@test.io' },
    { name: 'sam', email: 'sam@test.io' },
  ];

  const { container } = render(<UserList users={users} />);

  return {
    users,
    container,
  };
};

test('render one row per user', () => {
  const { users, container } = renderComponent();

  // const rows = within(screen.getByTestId('users')).getAllByRole('row');
  const rows = container.querySelectorAll('tbody tr');

  expect(rows).toHaveLength(users.length);
});

test('render email and name for each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
