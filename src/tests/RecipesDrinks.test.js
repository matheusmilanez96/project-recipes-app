import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página Recipes com rota drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.fn();
  });
  it('Clica nos filtros de receita', async () => {
    renderWithRouterAndRedux(<App />);
    const mealsFiltersBtn = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other / Unknown', 'Cocoa'];

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

    mealsFiltersBtn.forEach(async (filter, index) => {
      const filterBtn = screen.getByText(filter);

      userEvent.click(filterBtn);

      if (index % 0) {
        userEvent.click(filterBtn);
      }
      if (index % 1) {
        const allFilterBtn = screen.getByTestId('All-category-filter');
        userEvent.click(allFilterBtn);
      }
    });
    const GG = screen.getByTestId('0-recipe-card');
    userEvent.click(GG);

    // await waitFor(() => expect(history.location.pathname).toBe('52844'));
  });

  it('Clica em uma receita', async () => {
    renderWithRouterAndRedux(<App />);

    // await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeVisible(), { timeout: 3000 });

    // const GG = screen.getByTestId('0-recipe-card');
    // userEvent.click(GG);

    // await waitFor(() => expect(history.location.pathname).toBe('52844'));
  });
});
