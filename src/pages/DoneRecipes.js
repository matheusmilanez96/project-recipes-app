import React, { Component } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default class DoneRecipes extends Component {
  state = {
    pageName: 'Done Recipes',
    hasSearchIcon: false,
    filteredRecipes: [],
  };

  componentDidMount() {
    const getDoneRecepies = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      filteredRecipes: getDoneRecepies,
    });
  }

  resetFilteredRecipes = () => {
    const getDoneRecepies = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      filteredRecipes: getDoneRecepies,
    });
  };

  handleFilters = (filterName) => {
    const getDoneRecepies = JSON.parse(localStorage.getItem('doneRecipes'));
    const searchedRecipes = getDoneRecepies
      .filter((doneRecipe) => doneRecipe.type.includes(filterName));
    this.setState({
      filteredRecipes: searchedRecipes,
    });
  };

  render() {
    const { pageName, hasSearchIcon } = this.state;
    const { filteredRecipes } = this.state;
    return (
      <div
        className="bg-[url('./images/backgrounds/mealsBackground.jpg')]
      bg-cover min-h-screen bg-repeat-y"
      >
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <div className="flex justify-evenly mt-3">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => this.resetFilteredRecipes() }
            className="border-1 border-black py-1 px-3 w-14 bg-red-400 rounded-md text-white"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => this.handleFilters('meal') }
            className="border-1 border-black py-1 px-3 bg-red-400 rounded-md text-white"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => this.handleFilters('drink') }
            className="border-1 border-black py-1 px-3 bg-red-400 rounded-md text-white"
          >
            Drinks
          </button>
        </div>
        <section style={ { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' } }>
          {filteredRecipes && filteredRecipes.map((recipe, index) => (
            <DoneRecipeCard
              key={ index }
              index={ index }
              image={ recipe.image }
              name={ recipe.name }
              category={ `${recipe.nationality} 
            - ${recipe.category}` }
              alcoholic={ `- ${recipe.alcoholicOrNot}` }
              doneDate={ recipe.doneDate }
              tags={ recipe.tags }
              type={ recipe.type }
              id={ recipe.id }
            />
          ))}
        </section>
      </div>
    );
  }
}
