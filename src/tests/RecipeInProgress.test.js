import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de receitas em progresso pela tela de comidas', () => {
  const step0 = '0-ingredient-step';
  const step1 = '1-ingredient-step';
  const step2 = '2-ingredient-step';
  const step3 = '3-ingredient-step';
  const start = 'start-recipe-btn';
  const finish = 'finish-recipe-btn';
  it('Entra em RecipeInProgress e testa seus componentes', async () => {
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

    const startBtn = screen.getByTestId(start);
    userEvent.click(startBtn);

    await waitFor(() => expect(screen.getByTestId('1-ingredient-step')).toBeVisible(), { timeout: 3000 });

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    window.location.reload();

    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    const ig0 = screen.getByTestId(step0);
    const ig1 = screen.getByTestId(step1);
    const ig2 = screen.getByTestId(step2);
    const ig3 = screen.getByTestId(step3);
    userEvent.click(ig0);
    userEvent.click(ig1);
    userEvent.click(ig2);
    userEvent.click(ig3);

    userEvent.click(screen.getByTestId(finish));
    userEvent.click(screen.getByTestId('0-horizontal-image'));
    userEvent.click(screen.getByTestId(start));

    await waitFor(() => expect(screen.getByTestId('3-ingredient-step')).toBeVisible(), { timeout: 3000 });

    const i0 = screen.getByTestId(step0);
    const i1 = screen.getByTestId(step1);
    const i2 = screen.getByTestId(step2);
    const i3 = screen.getByTestId(step3);
    userEvent.click(i0);
    userEvent.click(i1);
    userEvent.click(i2);
    userEvent.click(i3);

    userEvent.click(screen.getByTestId(finish));

    userEvent.click(screen.getByTestId('profile-top-btn'));
    userEvent.click(screen.getByTestId('profile-logout-btn'));
  });
  it('Entra em RecipeInProgress na tela de bebidas e testa seus componentes', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getAllByTestId('email-input');
    const password = screen.getAllByTestId('password-input');
    const button = screen.getAllByTestId('login-submit-btn');

    userEvent.type(email[0], 'final@front.com');
    userEvent.type(password[0], '1234567');

    userEvent.click(button[0]);
    await waitFor(() => expect(screen.getByText('Poutine')).toBeVisible(), { timeout: 3000 });

    const drinkEl = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkEl);

    await waitFor(() => expect(screen.getByText('Adam')).toBeVisible(), { timeout: 3000 });

    const adamEl = screen.getByText('Adam');
    userEvent.click(adamEl);

    const startBtn2 = screen.getByTestId('start-recipe-btn');
    userEvent.click(startBtn2);

    await waitFor(() => expect(screen.getByTestId('0-ingredient-step')).toBeVisible(), { timeout: 3000 });

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    const ig0 = screen.getByTestId(step0);
    const ig1 = screen.getByTestId(step1);
    const ig2 = screen.getByTestId('2-ingredient-step');
    userEvent.click(ig0);
    userEvent.click(ig1);
    userEvent.click(ig2);

    userEvent.click(screen.getByTestId('finish-recipe-btn'));
  });
});
