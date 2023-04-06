import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página Recipes com rota drinks', () => {
  it('Clica nos filtros de receita', async () => {
    renderWithRouterAndRedux(<App />, [], '/drinks');
    const mealsFiltersBtn = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other / Unknown', 'Cocoa'];

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

    mealsFiltersBtn.forEach((filter, index) => {
      const filterBtn = screen.getByTestId(`${filter}-category-filter`);

      userEvent.click(filterBtn);

      if (index % 0) {
        userEvent.click(filterBtn);
      }
      if (index % 1) {
        const allFilterBtn = screen.getByTestId('All-category-filter');
        userEvent.click(allFilterBtn);
      }
    });
  });

  it('Clica em uma receita', async () => {
    renderWithRouterAndRedux(<App />, [], '/meals');

    await waitFor(() => expect(screen.getByAltText('ABC')).toBeVisible(), { timeout: 3000 });

    const ABC = screen.getByTestId('2-recipe-card');
    userEvent.click(ABC);

    // await waitFor(() => expect(history.location.pathname).toBe('52844'));
  });
});
