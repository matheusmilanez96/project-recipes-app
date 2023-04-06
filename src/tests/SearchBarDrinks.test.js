import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa searchBar na rota Drinks', () => {
  it('Procura nos inputs', async () => {
    renderWithRouterAndRedux(<App />, [], '/drinks');

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);

    waitFor(() => screen.getByTestId('drinks-bottom-btn'));

    const drinksFooterBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksFooterBtn);

    await waitFor(() => expect(screen.getByText('GG')).toBeVisible(), { timeout: 3000 });

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeVisible();
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientsInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
    const filterButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'gin');
    userEvent.click(ingredientsInput);
    userEvent.click(filterButton);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'g');
    userEvent.click(firstLetterInput);
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'gg');
    userEvent.click(firstLetterInput);
    userEvent.click(filterButton);

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'rum');
    userEvent.click(nameInput);
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type('sorvete');
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Acid');
    userEvent.click(filterButton);
  });
});
