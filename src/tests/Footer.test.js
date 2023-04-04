import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Footer', () => {
  it('Testa se o footer e seus elementos estão presentes na tela principal', () => {
    renderWithRouterAndRedux(<Recipes />);

    const footer = screen.getByTestId('footer');
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealIcon = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa se o footer está presente na tela de perfil', () => {
    renderWithRouterAndRedux(<Profile />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Testa se o botão drink leva à página correta', () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('Testa se o botão meal leva à página correta', () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealIcon);

    expect(history.location.pathname).toBe('/meals');
  });
});
