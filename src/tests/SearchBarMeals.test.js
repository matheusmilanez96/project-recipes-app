import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa searchBar na rota Meals', () => {
  it('Procura nos inputs', async () => {
    renderWithRouterAndRedux(<App />, [], '/meals');

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);
    await waitFor(() => expect(screen.getByText('Beef')).toBeVisible(), { timeout: 3000 });

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeVisible();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientsInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'bread');
    userEvent.click(ingredientsInput);
    userEvent.click(filterButton);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'b');
    userEvent.click(firstLetterInput);
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'bb');
    userEvent.click(firstLetterInput);
    userEvent.click(filterButton);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'soup');
    userEvent.click(nameInput);
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type('sopa');
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Sushi');
    userEvent.click(filterButton);
  });
});
