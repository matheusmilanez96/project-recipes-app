import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DrinksCards extends Component {
  render() {
    const twelve = 12;
    const { recipes: { drinks }, history } = this.props;
    return (
      <div>
        Receitas
        {drinks && drinks.reduce((acc, curr, index) => {
          if (index < twelve) {
            const card = (
              <div
                role="presentation"
                data-testid={ `${index}-recipe-card` }
                key={ curr.strDrink }
                className="drink-card"
                onClick={ () => history.push(`/drinks/${curr.idDrink}`) }
              >
                <img
                  src={ curr.strDrinkThumb }
                  alt={ curr.strDrink }
                  className="recipe-card-img"
                  data-testid={ `${index}-card-img` }
                />
                <div data-testid={ `${index}-card-name` }>{curr.strDrink}</div>
              </div>);
            acc.push(card);
          }
          return acc;
        }, [])}
      </div>
    );
  }
}

DrinksCards.propTypes = {
  recipes: PropTypes.shape({
    drinks: PropTypes.arrayOf,
  }).isRequired,
}.isRequired;

export default DrinksCards;
