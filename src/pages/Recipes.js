import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import DrinksCards from '../components/DrinksCards';
import '../styles/recipes.css';
import MealsFilterButtons from '../components/MealsFilterButtons';
import DrinksFilterButtons from '../components/DrinksFilterButtons';

export default class Recipes extends Component {
  state = {
    recipeType: '/meals',
    recipes: '',
    pageName: '',
    hasSearchIcon: true,
  };

  componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    this.setState({
      recipeType: pathname,
    }, this.fetchRecipes);
  }

  fetchRecipes = async () => {
    const { recipeType } = this.state;
    let recipes = '';
    if (recipeType === '/meals') {
      recipes = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    } else {
      recipes = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
    }
    this.setState({
      recipes,
      pageName: recipeType === '/meals' ? 'Meals' : 'Drinks',
    });
  };

  filterRecipes = (recipes) => {
    this.setState({
      recipes,
    });
  };

  render() {
    const { recipes, recipeType, pageName, hasSearchIcon } = this.state;
    const { history } = this.props;
    return (
      <div className="recipes-first-div">
        <Header
          pageName={ pageName }
          hasSearchIcon={ hasSearchIcon }
          recipeType={ recipeType }
          history={ history }
        />
        <main className="main-recipes">
          {recipeType === '/meals' ? <MealsCards recipes={ recipes } />
            : <DrinksCards recipes={ recipes } /> }
        </main>
        {recipeType === '/meals'
          ? <MealsFilterButtons filterRecipes={ this.filterRecipes } />
          : <DrinksFilterButtons filterRecipes={ this.filterRecipes } />}
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
