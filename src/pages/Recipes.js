import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import DrinksCards from '../components/DrinksCards';
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

  changePageName = (newName) => {
    this.setState({
      recipeType: newName,
      pageName: newName === '/meals' ? 'Meals' : 'Drinks',
    }, this.fetchRecipes);
  };

  render() {
    const { recipes, recipeType, pageName, hasSearchIcon } = this.state;
    const { history } = this.props;
    const background = pageName === 'Drinks'
      ? "bg-[url('./images/backgrounds/drinksBackground.jpg')] bg-cover h-full bg-repeat" 
      : "bg-[url('./images/backgrounds/mealsBackground.jpg')] bg-cover h-full bg-repeat"
    return (
      <div className={ background }>
        <Header
          pageName={ pageName }
          hasSearchIcon={ hasSearchIcon }
          recipeType={ recipeType }
          filterRecipes={ (e) => this.filterRecipes(e) }
        />
        <main className="main-recipes">
          {recipeType === '/meals'
            ? <MealsCards recipes={ recipes } history={ history } />
            : <DrinksCards recipes={ recipes } history={ history } /> }
        </main>
        {recipeType === '/meals'
          ? <MealsFilterButtons filterRecipes={ this.filterRecipes } />
          : <DrinksFilterButtons filterRecipes={ this.filterRecipes } />}
        <Footer changePageName={ this.changePageName } pageName={ pageName } />
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
