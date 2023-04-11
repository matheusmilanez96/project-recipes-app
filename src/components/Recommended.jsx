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
      <div>
        <h4>Recommended</h4>

        <div
          style={ { display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginRight: '10px' } }
        >
          <button
            style={ { width: '100px',
              alignSelf: 'center',
              borderRadius: '60px',
              padding: '30px' } }
            onClick={ () => this.handlePrevBtn() }
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
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  { item.strMeal || item.strDrink }
                </p>
              </div>
            ))
          }

          <button
            style={ { width: '100px',
              alignSelf: 'center',
              borderRadius: '60px',
              padding: '30px' } }
            onClick={ () => this.handleNextBtn() }
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
