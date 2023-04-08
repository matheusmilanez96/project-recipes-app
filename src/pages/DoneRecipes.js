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
    console.log(filteredRecipes);
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => this.resetFilteredRecipes() }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => this.handleFilters('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => this.handleFilters('drink') }
        >
          Drinks
        </button>
        <section style={ { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' } }>
          {filteredRecipes.map((recipe, index) => (
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
