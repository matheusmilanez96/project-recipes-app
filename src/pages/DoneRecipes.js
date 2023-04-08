import React, { Component } from 'react';
import Header from '../components/Header';

export default class DoneRecipes extends Component {
  state = {
    pageName: 'Done Recipes',
    hasSearchIcon: false,
  };

  componentDidMount() { console.log(this.getDoneRecepies()); }

  getDoneRecepies = () => JSON.parse(localStorage.getItem('doneRecipes'));

  render() {
    const { pageName, hasSearchIcon } = this.state;

    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        { this.getDoneRecepies().map((doneRecipe, index) => (
          <div
            className="recipeCard"
            key={ doneRecipe.id }
            style={ { border: '1px solid black',
              borderRadius: '30px',
              padding: '10px',
              margin: '10px',
              backgroundColor: 'green',
              color: 'white' } }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.image }
              alt="recipe"
              style={ { width: '200px', height: '200px', borderRadius: '30px' } }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {doneRecipe.nationality}
              {' '}
              -
              {' '}
              {doneRecipe.category}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {doneRecipe.doneDate}
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar a receita
            </button>
            {(doneRecipe.tags.length === 0)
              ? <div data-testid={ `${index}-${doneRecipe.tags}-horizontal-tag` } />
              : (
                <div data-testid={ `${index}-${doneRecipe.tags}-horizontal-tag` }>
                  {doneRecipe.strTags.map((tag) => <p key={ tag }>{tag}</p>)}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  }
}
