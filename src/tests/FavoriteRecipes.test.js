import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa a página de receitas favoritas', () => {
  const profileFav = 'profile-favorite-btn';
  it('Entra em favoriteRecipes sem nada favoritado', async () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const poutineEl = screen.queryByText('Poutine');
    expect(poutineEl).not.toBeInTheDocument();
  });
  it('Entra em favoriteRecipes pelo app e testa seus componentes', async () => {
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

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

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

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeVisible();
    userEvent.click(profileBtn);

    await waitFor(() => screen.getByTestId(profileFav));

    const favoriteButton = screen.getByTestId(profileFav);
    userEvent.click(favoriteButton);

    const favoriteMealsBtn = screen.getByTestId('filter-by-meal-btn');
    const favoriteDrinksBtn = screen.getByTestId('filter-by-drink-btn');
    const allFavoritesBtn = screen.getByTestId('filter-by-all-btn');

    userEvent.click(favoriteMealsBtn);
    userEvent.click(favoriteDrinksBtn);
    userEvent.click(allFavoritesBtn);

    const poutineUnlike = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(poutineUnlike);
  });
});
