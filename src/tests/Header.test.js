import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Header', () => {
  it('Testa se o header e seus elementos estão presentes na tela principal', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');

    const header = screen.getByTestId('header');
    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  it('Testa se o Header está presente na tela de perfil', () => {
    renderWithRouterAndRedux(<Profile />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  it('Testa se o botão search revela e esconde o input-search ao ser clicado', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'final@front.com');
    userEvent.type(password, '1234567');

    userEvent.click(button);

    waitFor(() => screen.getByTestId('search-top-btn').toBeInTheDocument());

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
    expect(pageTitle).toHaveTextContent('Favorite Recipes');

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    waitFor(() => screen.getByText(/Profile/i).toBeInTheDocument());
  });
});
