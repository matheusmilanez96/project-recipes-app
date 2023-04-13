import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipeInProgress.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import unfavoriteIcon from '../images/blackHeartIcon.svg';
import getMealObj from '../helpers/getMealObj';
import getDrinkObj from '../helpers/getDrinkObj';
import getMealObj2 from '../helpers/getMealObj2';
import getDrinkObj2 from '../helpers/getDrinkObj2';

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
      checkedIngredients: [],
      type: '',
      id: '',
      linkCopied: false,
      isFav: false,
    };

    this.finishClick = this.finishClick.bind(this);
    this.handleChecks = this.handleChecks.bind(this);
    this.searchFavs = this.searchFavs.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    this.searchFavs(id);
    const uncheckedIngredients = [];
    if (type === 'meals') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { meals } = data;
      const recipe = meals[0];
      const ingredientsList = Object.entries(recipe).reduce((acc, curr) => {
        if (curr[0].includes('strIngredient') && curr[1]) {
          acc.push(curr[1]);
          uncheckedIngredients.push(false);
        }
        return acc;
      }, []);
      this.setState({
        recipe,
        thumbnail: recipe.strMealThumb,
        title: recipe.strMeal,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
        ingredientsList,
        checkedIngredients: uncheckedIngredients,
        type,
        id,
      });
    } else {
      const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const { drinks } = data;
      const recipe = drinks[0];
      const ingredientsList = Object.entries(recipe).reduce((acc, curr) => {
        if (curr[0].includes('strIngredient') && curr[1]) {
          acc.push(curr[1]);
          uncheckedIngredients.push(false);
        }
        return acc;
      }, []);
      this.setState({
        recipe,
        thumbnail: recipe.strDrinkThumb,
        title: recipe.strDrink,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
        ingredientsList,
        checkedIngredients: uncheckedIngredients,
        type,
        id,
      });
    }
  }

  handleChecks({ target: { id } }) {
    const { checkedIngredients } = this.state;
    const newCheckedArray = checkedIngredients.reduce((acc, curr, index) => {
      acc.push(Number(index) === Number(id) ? !curr : curr);
      return acc;
    }, []);
    this.setState({
      checkedIngredients: newCheckedArray,
    });
  }

  copyToClipboard = () => {
    const { type, id } = this.state;
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
    this.setState({
      linkCopied: true,
    });
  };

  searchFavs(id) {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          this.setState({
            isFav: true,
          });
        }
      });
    } else {
      this.setState({
        isFav: false,
      });
    }
  }

  favoriteClick(recipe) {
    const { type, id, isFav } = this.state;
    let finalRecipe;
    if (isFav === false) {
      this.setState({
        isFav: true,
      });
      if (type === 'meals') {
        finalRecipe = getMealObj(recipe);
      } else {
        finalRecipe = getDrinkObj(recipe);
      }
      if (localStorage.getItem('favoriteRecipes') !== null) {
        const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const recipeArr = [...favoriteRecipes, finalRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(recipeArr));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([finalRecipe]));
      }
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavs = [];
      favoriteRecipes.forEach((favRecipe) => {
        if (favRecipe.id !== id) {
          newFavs.push(favRecipe);
        }
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
      this.setState({
        isFav: false,
      });
    }
  }

  finishClick(recipe) {
    const { history } = this.props;
    const { type } = this.state;
    let finalRecipe;
    if (type === 'meals') {
      finalRecipe = getMealObj2(recipe);
    } else {
      finalRecipe = getDrinkObj2(recipe);
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
      checkedIngredients, linkCopied, isFav,
    } = this.state;
    return (
      <div className="scroller2">
        <img
          src={ thumbnail }
          alt="img"
          data-testid="recipe-photo"
          className="recipeImg"
        />
        <h2 data-testid="recipe-title">{title}</h2>
        <button onClick={ () => this.copyToClipboard() }>
          <img data-testid="share-btn" src={ shareIcon } alt="share icon" />
        </button>
        {(linkCopied === true)
          && <p>Link copied!</p> }
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => this.favoriteClick(recipe) }
          src={ isFav ? unfavoriteIcon : favoriteIcon }
        >
          <img src={ isFav ? unfavoriteIcon : favoriteIcon } alt="heart" />
        </button>
        <h4 data-testid="recipe-category">{category}</h4>
        { ingredientsList.map((ingredient, index) => (
          ingredient && (
            <div key={ index }>
              <label
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                style={ checkedIngredients[index]
                  ? { textDecoration: 'line-through solid black' } : {} }
              >
                <input
                  type="checkbox"
                  id={ index }
                  name={ ingredient }
                  onChange={ this.handleChecks }
                  // checked={ checkedIngredients[index] }
                />
                { ingredient }
              </label>
            </div>
          )
        ))}
        <p data-testid="instructions">{instructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => this.finishClick(recipe) }
          disabled={ checkedIngredients.includes(false) }
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
