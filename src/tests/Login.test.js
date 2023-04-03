import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

test('Farewell, front-end', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  expect(history.location.pathname).toBe('/');

  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  expect(email).toBeVisible();
  expect(password).toBeVisible();
  expect(button).toBeDisabled();

  userEvent.type(email, 'final@front.com');
  userEvent.type(password, '1234567');
  expect(button).not.toBeDisabled();

  userEvent.click(button);
  waitFor(() => expect(email).not.toBeVisible());
  // const { pathname } = history.location;
  // expect(pathname).toBe('/meals');
});
