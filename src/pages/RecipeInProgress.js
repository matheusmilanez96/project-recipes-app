import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RecipeInProgress extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {},
      thumbnail: '',
      title: '',
      category: '',
      instructions: '',
    };

    this.finishClick = this.finishClick.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (type === 'meals') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { meals } = data;
      const recipe = meals[0];
      this.setState({
        recipe,
        thumbnail: recipe.strMealThumb,
        title: recipe.strMeal,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
      });
    } else {
      const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { drinks } = data;
      const recipe = drinks[0];
      this.setState({
        recipe,
        thumbnail: recipe.strDrinkThumb,
        title: recipe.strDrink,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
      });
    }
  }

  finishClick(recipe) {
    const { history } = this.props;
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(doneRecipes);
      const recipeArr = [...doneRecipes, recipe];
      console.log(recipeArr);
      localStorage.setItem('doneRecipes', JSON.stringify(recipeArr));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    }
    history.push('/done-recipes');
  }

  render() {
    const { recipe, thumbnail, title, category, instructions } = this.state;
    return (
      <div>
        <img
          src={ thumbnail }
          alt="img"
          data-testid="recipe-photo"
          className="recipeImg"
        />
        <h2 data-testid="recipe-title">{title}</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h4 data-testid="recipe-category">{category}</h4>
        <p data-testid="instructions" className="instructionsText">{instructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => this.finishClick(recipe) }
        >
          Finalizar
        </button>
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;
