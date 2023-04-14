import React, { Component } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

export default class FavoriteRecipes extends Component {
  state = {
    pageName: 'Favorite Recipes',
    hasSearchIcon: false,
    filteredRecipes: [],
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      const getFavoriteRecepies = JSON.parse(localStorage.getItem('favoriteRecipes'));
      this.setState({
        filteredRecipes: getFavoriteRecepies,
      });
    }
  }

  resetFilteredRecipes = () => {
    const getFavoriteRecepies = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      filteredRecipes: getFavoriteRecepies,
    });
  };

  handleFilters = (filterName) => {
    const getFavoriteRecepies = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const searchedRecipes = getFavoriteRecepies
      .filter((favoriteRecipe) => favoriteRecipe.type.includes(filterName));
    this.setState({
      filteredRecipes: searchedRecipes,
    });
  };

  handleUnlikeBtn = async (id) => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const editedFavoritesList = await getFavoriteRecipes
      .filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(editedFavoritesList));

    this.setState({
      filteredRecipes: editedFavoritesList,
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
            className="py-2 px-3 bg-red-400 rounded-md text-white"
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => this.handleFilters('meal') }
            className="p-2 bg-red-400 rounded-md text-white"
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => this.handleFilters('drink') }
            className="py-2 px-3 bg-red-400 rounded-md text-white"
          >
            Drinks
          </button>
        </div>
        <section style={ { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' } }>
          {filteredRecipes.map((recipe, index) => (
            <FavoriteRecipeCard
              key={ index }
              index={ index }
              image={ recipe.image }
              name={ recipe.name }
              category={ `${recipe.nationality} 
            - ${recipe.category}` }
              alcoholic={ `- ${recipe.alcoholicOrNot}` }
              favoriteDate={ recipe.favoriteDate }
              tags={ recipe.tags }
              type={ recipe.type }
              id={ recipe.id }
              handleUnlikeBtn={ () => this.handleUnlikeBtn(recipe.id) }
            />
          ))}
        </section>
      </div>
    );
  }
}
