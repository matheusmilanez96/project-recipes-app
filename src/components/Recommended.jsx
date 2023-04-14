import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Recommended extends Component {
  state = {
    card: 0,
  };

  handlePrevBtn = () => {
    const { card } = this.state;
    if (card !== 0) {
      this.setState({
        card: card - 2,
      });
    }
  };

  handleNextBtn = () => {
    const { card } = this.state;
    const four = 4;
    if (card !== four) {
      this.setState({
        card: card + 2,
      });
    }
  };

  render() {
    const { card } = this.state;

    const { recommendedList } = this.props;
    const limit = 6;
    const list = recommendedList.slice(0, limit);

    return (
      <div className="p-2 mb-10">
        <h4 className="text-center p-2 text-blue-600 font-bold">Recommended</h4>

        <div
          className="flex justify-around items-center"
        >
          <button
            onClick={ () => this.handlePrevBtn() }
            className="bg-blue-400 mx-2 my-1 px-2 py-1 rounded-md hover:bg-sky-500
            text-white font-bold"
          >
            Prev
          </button>
          {
            list.map((item, index) => (
              <div
                data-testid={ `${index}-recommendation-card` }
                key={ index }
                className={ index === card || index === card + 1 ? 'active' : 'hidden' }
              >
                <img
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt="recommended"
                  width="150px"
                  className="rounded-full w-full p-2"
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                  className=" text-center text-blue-500 font-semibold"
                >
                  { item.strMeal || item.strDrink }
                </p>
              </div>
            ))
          }
          <button
            onClick={ () => this.handleNextBtn() }
            className="bg-blue-400 mx-2 my-1 px-2 py-1 rounded-md hover:bg-sky-500
            text-white font-bold"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Recommended.propTypes = {
  recommendedList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
}.isRequired;
