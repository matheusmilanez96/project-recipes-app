import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RecipeDetails extends Component {
  state = {
    recipe: '',
  };

  async componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const id = pathname.split('/')[2];
    console.log(id, pathname);

    let recipe = '';
    if (pathname === `/meals/${id}`) {
      recipe = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    } else {
      recipe = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    }
    this.setState({
      recipe,
    }, () => console.log(recipe));
  }

  render() {
    const { recipe } = this.state;

    return (
      <div>
        {' '}
        { recipe
          ? recipe.meals[0].idMeal
          : <h1>Loading...</h1>}
        {' '}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  // id: PropTypes.number.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
