import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de receitas prontas', () => {
  it('Entra em doneRecipes', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);
    await waitFor(() => expect(screen.getByText('Poutine')).toBeVisible(), { timeout: 3000 });

    const poutineEl = screen.getByText('Poutine');
    userEvent.click(poutineEl);

    const startBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn);

    await waitFor(() => expect(screen.getByTestId('1-ingredient-step')).toBeVisible(), { timeout: 3000 });
    const ig0 = screen.getByTestId('0-ingredient-step');
    const ig1 = screen.getByTestId('1-ingredient-step');
    const ig2 = screen.getByTestId('2-ingredient-step');
    const ig3 = screen.getByTestId('3-ingredient-step');
    userEvent.click(ig0);
    userEvent.click(ig1);
    userEvent.click(ig2);
    userEvent.click(ig3);

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishBtn);

    await waitFor(() => expect(screen.getByText('Poutine')).toBeVisible(), { timeout: 3000 });

    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilter);
    expect(screen.queryByText('Poutine')).toBeInTheDocument();

    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);
    expect(screen.queryByText('Poutine')).not.toBeInTheDocument();

    const allFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilter);
    expect(screen.queryByText('Poutine')).toBeInTheDocument();
  });
});
