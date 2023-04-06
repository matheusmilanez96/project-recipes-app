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
      ingredientsList: [],
      type: '',
    };

    this.finishClick = this.finishClick.bind(this);
    this.getMealObj = this.getMealObj.bind(this);
    this.getDrinkObj = this.getDrinkObj.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (type === 'meals') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { meals } = data;
      const recipe = meals[0];
      const ingredientsList = [
        recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
        recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
        recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
        recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12,
        recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15,
        recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18,
        recipe.strIngredient19, recipe.strIngredient20];
      this.setState({
        recipe,
        thumbnail: recipe.strMealThumb,
        title: recipe.strMeal,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
        ingredientsList,
        type,
      });
    } else {
      const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { drinks } = data;
      const recipe = drinks[0];
      const ingredientsList = [
        recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3,
        recipe.strIngredient4, recipe.strIngredient5, recipe.strIngredient6,
        recipe.strIngredient7, recipe.strIngredient8, recipe.strIngredient9,
        recipe.strIngredient10, recipe.strIngredient11, recipe.strIngredient12,
        recipe.strIngredient13, recipe.strIngredient14, recipe.strIngredient15,
        recipe.strIngredient16, recipe.strIngredient17, recipe.strIngredient18,
        recipe.strIngredient19, recipe.strIngredient20];
      this.setState({
        recipe,
        thumbnail: recipe.strDrinkThumb,
        title: recipe.strDrink,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
        ingredientsList,
        type,
      });
    }
  }

  getMealObj(recipe) {
    let recipeTags;
    if (recipe.strTags !== null) {
      recipeTags = recipe.strTags.split(',');
    }
    const now = new Date();
    const date = now.toISOString();
    const finalRecipe = {
      id: recipe.idMeal ? recipe.idMeal : '',
      nationality: recipe.strArea ? recipe.strArea : '',
      name: recipe.strMeal ? recipe.strMeal : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      image: recipe.strMealThumb ? recipe.strMealThumb : '',
      tags: recipeTags || [],
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      type: 'meal',
      doneDate: date,
    };
    return finalRecipe;
  }

  getDrinkObj(recipe) {
    let recipeTags;
    if (recipe.strTags !== null) {
      recipeTags = recipe.strTags.split(',');
    }
    const now = new Date();
    const date = now.toISOString();
    const finalRecipe = {
      id: recipe.idDrink ? recipe.idDrink : '',
      nationality: recipe.strArea ? recipe.strArea : '',
      name: recipe.strDrink ? recipe.strDrink : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      image: recipe.strDrinkThumb ? recipe.strDrinkThumb : '',
      tags: recipeTags || [],
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      type: 'drink',
      doneDate: date,
    };
    return finalRecipe;
  }

  finishClick(recipe) {
    const { history } = this.props;
    const { type } = this.state;
    let finalRecipe;
    if (type === 'meals') {
      finalRecipe = this.getMealObj(recipe);
    } else {
      finalRecipe = this.getDrinkObj(recipe);
    }
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const recipeArr = [...doneRecipes, finalRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(recipeArr));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([finalRecipe]));
    }
    history.push('/done-recipes');
  }

  render() {
    const {
      recipe, thumbnail, title, category, instructions, ingredientsList,
    } = this.state;
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
        { ingredientsList.map((ingredient, index) => (
          ingredient && (
            <div key={ index }>
              <label htmlFor={ index } data-testid={ `${index}-ingredient-step` }>
                <input type="checkbox" id={ index } name={ ingredient } />
                { ingredient }
              </label>
            </div>
          )
        ))}
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
