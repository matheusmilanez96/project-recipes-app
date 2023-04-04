import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Footer', () => {
  it('Testa se o footer e seus elementos estão presentes na tela principal', () => {
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    history.push('/meals');

    const header = screen.getByTestId('header');
    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  it('Testa se o Header está presente na tela de perfil', () => {
    renderWithRouterAndRedux(<Profile />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBe('Profile');

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  it('Testa se o botão search revela e esconde o input-search ao ser clicado', () => {
    const { history } = renderWithRouterAndRedux(<Recipes />);
    history.push('/meals');

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Testa se o icone profile leva à página correta', async () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBe('Favorite Recipes');

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    await waitFor(() => {
      expect(getByText('Profile')).toBeInTheDocument();
    });
  });
});
