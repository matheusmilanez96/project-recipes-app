import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de receitas favoritas', () => {
  it('Entra em favoriteRecipes', async () => {
    renderWithRouterAndRedux(<App />, [], '/meals');

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);
    await waitFor(() => expect(screen.getByText('Beef')).toBeVisible(), { timeout: 3000 });

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeVisible();
    userEvent.click(profileBtn);

    await waitFor(() => screen.getByTestId('profile-favorite-btn'));

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton);

    const favoriteMealsBtn = screen.getByTestId('filter-by-meal-btn');
    const favoriteDrinksBtn = screen.getByTestId('filter-by-drink-btn');
    const allFavoritesBtn = screen.getByTestId('filter-by-all-btn');

    userEvent.click(favoriteMealsBtn);
    userEvent.click(favoriteDrinksBtn);
    userEvent.click(allFavoritesBtn);
  });

  // Falta clicar nas receitas. Esperando o recipeDetails
});
