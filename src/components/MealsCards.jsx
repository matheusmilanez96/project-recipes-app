import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsCards extends Component {
  selectedRecipe = (param) => {
    const { history } = this.props;
    history.push(`/meals/${param}`);
    console.log(param);
  };

  render() {
    const twelve = 12;
    const { recipes: { meals }, history } = this.props;
    return (
      <div>
        Receitas
        {meals && meals.reduce((acc, curr, index) => {
          if (index < twelve) {
            const card = (
              <div
                role="presentation"
                data-testid={ `${index}-recipe-card` }
                key={ curr.idMeal }
                className="meal-card"
                onClick={ () => history.push(`/meals/${curr.idMeal}`) }
              >
                <img
                  src={ curr.strMealThumb }
                  alt={ curr.strMeal }
                  className="recipe-card-img"
                  data-testid={ `${index}-card-img` }
                />
                <div data-testid={ `${index}-card-name` }>{curr.strMeal}</div>
              </button>);
            acc.push(card);
          }
          return acc;
        }, [])}
      </div>
    );
  }
}

MealsCards.propTypes = {
  recipes: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MealsCards;
