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
    <div className="bg-[url('./images/backgrounds/mealsBackground.jpg')]
    bg-cover h-full bg-repeat">
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route
              path="/meals/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route
              path="/drinks/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route path="/meals/:id" component={ RecipeDetails } />
            <Route path="/drinks/:id" component={ RecipeDetails } />
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route path="/profile" component={ Profile } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
