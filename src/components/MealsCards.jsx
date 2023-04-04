import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsCards extends Component {
  render() {
    const twelve = 12;
    const { recipes: { meals } } = this.props;
    return (
      <div>
        Receitas
        {meals && meals.reduce((acc, curr, index) => {
          if (index < twelve) {
            const card = (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ curr.strMeal }
                className="meal-card"
              >
                <img
                  src={ curr.strMealThumb }
                  alt={ curr.strMeal }
                  className="recipe-card-img"
                  data-testid={ `${index}-card-img` }
                />
                <div data-testid={ `${index}-card-name` }>{curr.strMeal}</div>
              </div>);
            acc.push(card);
          }
          return acc;
        }, [])}
      </div>
    );
  }
}

MealsCards.propTypes = {
  recipes: PropTypes.shape({
    meals: PropTypes.arrayOf,
  }).isRequired,
};

export default MealsCards;
