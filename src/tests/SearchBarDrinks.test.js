import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('Testa searchBar na rota Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.fn();
  });
  it('Procura nos inputs', async () => {
    // global.fetch = jest.fn(fetch);
    renderWithRouterAndRedux(<App />);

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);

    await waitFor(() => screen.getByTestId('drinks-bottom-btn'));

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

    userEvent.type(searchInput, 'Light rum');
    userEvent.click(ingredientsInput);
    userEvent.click(filterButton);

    await waitFor(() => expect(screen.getByText('A Night In Old Mandalay')).toBeVisible());

    // userEvent.clear(searchInput);
    // userEvent.type(searchInput, 's');
    // userEvent.click(firstLetterInput);
    // userEvent.click(filterButton);

    // await waitFor(() => expect(screen.getByText('Spaghetti Bolognese')).toBeVisible());

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'gg');
    userEvent.click(firstLetterInput);
    userEvent.click(filterButton);
    // expect alert to be called

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'gin');
    userEvent.click(nameInput);
    userEvent.click(filterButton);

    await waitFor(() => expect(screen.getByText('Gin Toddy')).toBeVisible());

    userEvent.clear(searchInput);
    userEvent.type('xablau');
    userEvent.click(filterButton);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(filterButton);

    // fazer um expect do produto que virá
  });
  it('Testa os alertas', () => {

  });
});
