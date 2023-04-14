import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsCards extends Component {
  render() {
    const twelve = 12;
    const { recipes: { meals }, history } = this.props;
    return (
      <div className="flex flex-wrap m-4 bg-yellow-900/70 justify-around rounded-lg">
        {meals && meals.reduce((acc, curr, index) => {
          if (index < twelve) {
            const card = (
              <div
                role="presentation"
                data-testid={ `${index}-recipe-card` }
                key={ curr.strMeal }
                onClick={ () => history.push(`/meals/${curr.idMeal}`) }
                className="w-28 p-3 text-white font-bold flex flex-col"
              >
                <img
                  src={ curr.strMealThumb }
                  alt={ curr.strMeal }
                  data-testid={ `${index}-card-img` }
                  className="rounded-full hover:shadow-lg hover:shadow-red-600"
                />
                <div
                  data-testid={ `${index}-card-name` }
                  className="p-1 text-center"
                >
                  {curr.strMeal}

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

MealsCards.propTypes = {
  recipes: PropTypes.shape({
    meals: PropTypes.arrayOf,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MealsCards;
