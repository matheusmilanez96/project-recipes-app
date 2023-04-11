import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Recommended extends Component {
  state = {
    counter: 0,
  };

  handlePrevBtn = () => {
    const { counter } = this.state;
    if (counter !== 0) {
      this.setState({
        counter: counter - 2,
      });
    }
  };

  handleNextBtn = () => {
    const { counter } = this.state;
    const four = 4;
    if (counter !== four) {
      this.setState({
        counter: counter + 2,
      });
    }
  };

  render() {
    const { recommendedList } = this.props;
    const limit = 6;
    const list = recommendedList.slice(0, limit);
    const { counter } = this.state;
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
          <div
            data-testid={ `${list[counter]}-recommendation-card` }
          >
            <img
              src={ list[counter].strMealThumb || list[counter].strDrinkThumb }
              alt="recommended"
              width="300px"
            />
            <p data-testid={ `${list[counter]}-recommendation-title` }>
              { list[counter].strMeal || list[counter].strDrink }
            </p>
          </div>
          <div
            data-testid={ `${list[counter + 1]}-recommendation-card` }
          >
            <img
              src={ list[counter + 1].strMealThumb || list[counter + 1].strDrinkThumb }
              alt="recommended"
              width="300px"
            />
            <p data-testid={ `${list[counter + 1]}-recommendation-title` }>
              { list[counter + 1].strMeal || list[counter + 1].strDrink }
            </p>
          </div>
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

// <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
//   <div class="carousel-inner">
// {list.map((item, index) => (
//     <div
// class="carousel-item active"
// data-testid={ `${index}-recommendation-card` }
// key={ index }
// >
//       <img class="d-block w-100" src={ item.strMealThumb || item.strDrinkThumb } alt="slide">
//     </div>)
// }
//   </div>
// </div>
