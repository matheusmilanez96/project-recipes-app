import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Profile from '../pages/Profile';

describe('Testa o componente Profile', () => {
  it('Testa se o profile funciona corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');
    expect(button[0]).not.toBeDisabled();

    userEvent.click(button[0]);
    waitFor(() => expect(screen.getByText('Meals')).toBeVisible());

    const profileBtn = screen.getAllByTestId('profile-top-btn');
    userEvent.click(profileBtn[0]);

    const emailEl = screen.getByText('final@front.com');
    expect(emailEl).toBeInTheDocument();

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
  it('Testa se o profile funciona corretamente quando não há email na localStorage', () => {
    renderWithRouterAndRedux(<Profile />);

    const emailEl = screen.queryByTestId('profile-email');
    const { getByText } = within(emailEl);
    console.log(emailEl);
    expect(getByText('')).toBeInTheDocument();
  });
});
