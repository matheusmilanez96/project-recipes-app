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
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    const getFavoriteRecepies = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      filteredRecipes: getFavoriteRecepies,
    });
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
      <div className="scroller">
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
