import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ingredients extends Component {
  render() {
    const { ingredientsList } = this.props;

    return (
      <div>
        <h4>
          Ingredients

        </h4>
        {
          ingredientsList
            .map((ingredient, index) => (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <span>{ `${ingredient[0]} - ${ingredient[1]}` }</span>
              </div>
            ))
        }
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ),
  ),
}.isRequired;
