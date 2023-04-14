import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DrinksCards extends Component {
  render() {
    const twelve = 12;
    const { recipes: { drinks }, history } = this.props;
    return (
      <div className="flex flex-wrap m-4 bg-blue-900/70 justify-around rounded-lg">
        {drinks && drinks.reduce((acc, curr, index) => {
          if (index < twelve) {
            const card = (
              <div
                role="presentation"
                data-testid={ `${index}-recipe-card` }
                key={ curr.strDrink }
                onClick={ () => history.push(`/drinks/${curr.idDrink}`) }
                className="w-28 p-3 text-white font-bold flex flex-col"
              >
                <img
                  src={ curr.strDrinkThumb }
                  alt={ curr.strDrink }
                  data-testid={ `${index}-card-img` }
                  className="rounded-full hover:shadow-lg hover:shadow-blue-600"
                />
                <div
                  data-testid={ `${index}-card-name` }
                  className="p-1 text-center"
                >
                  {curr.strDrink}

                </div>
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
