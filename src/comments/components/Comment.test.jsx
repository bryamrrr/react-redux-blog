import React from'react';
import renderer from'react-test-renderer';
import { IntlProvider } from'react-intl';

import Comment from'./Comment.jsx';

import messages from'../../messages.json';

const comment = {
  id: 1,
  email: 'bryam@gmail.com',
  name: 'Bryam Rodriguez',
  body: 'Este es un comentario de prueba',
};

test('Comment should render the component', () => {
  const tree = renderer.create(
    <IntlProvider locale="es" messages={messages.es}><Comment {...comment} /></IntlProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});