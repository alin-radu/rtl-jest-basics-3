import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';

import { createServer } from '../test/server';

import HomeRoute from './HomeRoute';

const LANGUAGES = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];

const getMockItems = (language) => [
  {
    id: 1,
    full_name: `${language}_0`,
  },
  {
    id: 2,
    full_name: `${language}_1`,
  },
  {
    id: 3,
    full_name: `${language}_2`,
  },
];

createServer([
  {
    path: 'api/repositories',
    method: 'get',
    res: (req, _, __) => {
      const language = req.url.searchParams.get('q').split('language:')[1];
      const mockItems = getMockItems(language);

      return {
        items: [...mockItems],
      };
    },
  },
]);

test('render three links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  for (let language of LANGUAGES) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent(`${language}_0`);
    expect(links[1]).toHaveTextContent(`${language}_1`);
    expect(links[2]).toHaveTextContent(`${language}_2`);
  }
});

const pauseHelper = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
