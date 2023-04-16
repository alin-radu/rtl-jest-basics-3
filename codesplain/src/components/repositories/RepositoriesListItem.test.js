import { screen, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router';

import RepositoriesListItem from './RepositoriesListItem';

// act() warning, solution 2
// jest.mock('../tree/FileIcon.js', () => {
//   return () => {
//     return 'File Icon Component';
//   };
// });

const renderComponent = () => {
  const repository = {
    name: 'react',
    full_name: 'facebook/react',
    language: 'JavaScript',
    description: 'The library for web and native user interfaces',
    owner: {
      login: 'facebook',
    },
    html_url: 'https://github.com/facebook/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
};

test('shows a link to the github homepage for this repository', async () => {
  const { repository } = renderComponent();

  // act() warning, solution 1
  await screen.findByRole('img', { name: 'JavaScript' });

  const link = screen.getByRole('link', {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent();

  const icon = await screen.findByRole('img', { name: 'JavaScript' });

  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', { name: 'JavaScript' });

  const link = screen.getByRole('link', {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});

// const pauseHelper = (time) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
