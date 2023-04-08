import React, { Component } from 'react';
import Header from '../components/Header';

export default class DoneRecipes extends Component {
  state = {
    pageName: 'Done Recipes',
    hasSearchIcon: false,
  };

  componentDidMount() { this.getDoneRecepies(); }

  getDoneRecepies = () => JSON.parse(localStorage.getItem('doneRecipes'));

  render() {
    const { pageName, hasSearchIcon } = this.state;
    const allDoneRecipes = this.getDoneRecepies();
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        { allDoneRecipes.map((doneRecipe, index) => (
          <div className="recipeCard" key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.strMealThumb }
              alt="recipe"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{doneRecipe.strCategory}</p>
            <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.strMeal}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {doneRecipe.dateModified}
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar a receita
            </button>
            {(doneRecipe.strTags === null)
              ? <div data-testid={ `${index}-${doneRecipe.strTags}-horizontal-tag` } />
              : (
                <div data-testid={ `${index}-${doneRecipe.strTags}-horizontal-tag` }>
                  {doneRecipe.strTags.map((tag) => <p key={ tag }>{tag}</p>)}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  }
}
