import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente Footer', () => {
  it('Testa se o footer e seus elementos estão presentes na tela principal', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'final@front.com');
    userEvent.type(password, '1234567');

    userEvent.click(button);

    waitFor(() => screen.getByTestId('footer').toBeInTheDocument());

    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa se o footer está presente na tela de perfil', () => {
    renderWithRouterAndRedux(<App />);

    waitFor(() => screen.getByTestId('footer').toBeInTheDocument());

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Testa se o botão drink leva à página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    waitFor(() => expect(history.location.pathname).toBe('/drinks'));
  });

  it('Testa se o botão meal leva à página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealIcon);

    waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
