import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div className="meals">
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
            <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
            <Route
              path="/meals/:id-da-receita/in-progress"
              component={ RecipeInProgress }
            />
            <Route
              path="/drinks/:id-da-receita/in-progress"
              component={ RecipeInProgress }
            />
            <Route path="/profile" component={ Profile } />
            <Route path="/drinks" component={ Recipes } />
            <Route path="/meals" component={ Recipes } />
            <Route path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
