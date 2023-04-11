import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente Footer', () => {
  it('Testa se o footer e seus elementos estão presentes na tela principal', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'final@front.com');
    userEvent.type(password, '1234567');

    userEvent.click(button);

    await waitFor(() => expect(screen.getByTestId('footer')).toBeInTheDocument());

    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa se o footer está presente na tela de perfil', async () => {
    renderWithRouterAndRedux(<App />);

    await waitFor(() => expect(screen.getByTestId('footer')).toBeInTheDocument());

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Testa se o botão drink leva à página correta', async () => {
    renderWithRouterAndRedux(<App />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    await waitFor(() => expect(screen.getByTestId('Cocoa-category-filter')).toBeVisible());
  });

  it('Testa se o botão meal leva à página correta', async () => {
    renderWithRouterAndRedux(<App />);

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealIcon);

    await waitFor(() => expect(screen.getByTestId('Beef-category-filter')).toBeVisible());
  });
});
