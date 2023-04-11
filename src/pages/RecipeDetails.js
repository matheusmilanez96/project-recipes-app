import PropTypes from 'prop-types';
import React, { Component } from 'react';
import filteredIngredients from '../helpers/filteredIngredients';
import Ingredients from '../components/Ingredients';
import RecipeVideo from '../components/RecipeVideo';
import Recommended from '../components/Recommended';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

export default class RecipeDetails extends Component {
  constructor() {
    super();

    this.startClick = this.startClick.bind(this);
  }

  state = {
    thumbnail: '',
    title: '',
    category: '',
    isAlcoholic: '',
    instructions: '',
    ingredients: '',
    isLoading: false,
    linkCopied: false,
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (type === 'meals') {
      const { drinks: recommended } = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
      const { meals } = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const recipe = meals[0];
      this.setState({
        thumbnail: recipe.strMealThumb,
        title: recipe.strMeal,
        category: recipe.strCategory,
        instructions: recipe.strInstructions,
        ingredients: filteredIngredients(recipe),
        isLoading: true,
        recommended,
        video: recipe.strYoutube,
      });
    } else {
      const { meals: recommended } = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
      const { drinks } = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
      const recipe = drinks[0];
      this.setState({
        thumbnail: recipe.strDrinkThumb,
        title: recipe.strDrink,
        category: recipe.strCategory,
        isAlcoholic: recipe.strAlcoholic,
        instructions: recipe.strInstructions,
        ingredients: filteredIngredients(recipe),
        isLoading: true,
        recommended,
      });
    }
  }

  copyToClipboard = () => {
    const { history: { location: { pathname } } } = this.props;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    this.setState({
      linkCopied: true,
    });
  };

  startClick() {
    const { history: { location: { pathname } } } = this.props;
    const { history } = this.props;
    const type = pathname.split('/')[1];
    const id = pathname.split('/')[2];

    if (type === 'meals') {
      history.push(`${id}/in-progress`);
    } else {
      history.push('in-progress');
    }
  }

  render() {
    const {
      thumbnail,
      title,
      category,
      isAlcoholic,
      instructions,
      ingredients,
      isLoading,
      video,
      recommended,
      linkCopied,
    } = this.state;

    return (
      <div className="scroller">
        <img
          src={ thumbnail }
          alt="img"
          data-testid="recipe-photo"
          className="recipeImg"
          style={ {
            width: '100%',
          } }
        />
        <h2
          data-testid="recipe-title"
        >
          {title}

        </h2>
        <div>
          <button
            onClick={ () => this.copyToClipboard() }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          {(linkCopied === true)
          && <p>Link copied!</p> }
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ favoriteIcon } alt="heart" />
          </button>
        </div>

        <h4 data-testid="recipe-category">
          { category }
          {' '}
          { isAlcoholic }
        </h4>

        { isLoading
          ? <Ingredients ingredientsList={ ingredients } />
          : <p>Loading...</p>}

        <h4>Instructions</h4>
        <div
          data-testid="instructions"
          className="instructionsText"
          style={ {
            height: '80px',
            overflow: 'scroll',
          } }
        >
          {instructions}

        </div>

        { video && <RecipeVideo video={ video } /> }

        { recommended && <Recommended recommendedList={ recommended } /> }

        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => this.startClick() }
        >
          Start Recipe
        </button>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func,
  }).isRequired,
};
