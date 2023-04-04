import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DrinksFilterButtons extends Component {
  state = {
    filteredCategory: '',
    categories: '',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')).json();

    this.setState({
      categories,
    });
  };

  handleFilter = async ({ target: { id } }) => {
    const { filterRecipes } = this.props;
    const { filteredCategory } = this.state;
    let filteredRecipes = '';

    if (filteredCategory !== id && id !== 'all') {
      filteredRecipes = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`)).json();
      this.setState({
        filteredCategory: id,
      });
    } else {
      filteredRecipes = await (await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')).json();
      this.setState({
        filteredCategory: '',
      });
    }
    filterRecipes(filteredRecipes);
  };

  render() {
    const { categories: { drinks }, filteredCategory } = this.state;
    const five = 5;

    return (
      <div>
        {drinks && drinks.reduce((acc, curr, index) => {
          if (index < five) {
            const button = (
              <div key={ curr.strCategory }>
                <button
                  id={ curr.strCategory }
                  onClick={ this.handleFilter }
                  data-testid={ `${curr.strCategory}-category-filter` }
                >
                  {curr.strCategory}
                </button>
              </div>);
            acc.push(button);
          }
          return acc;
        }, [])}
        {filteredCategory && (
          <button
            data-testid="All-category-filter"
            id="all"
            onClick={ this.handleFilter }
          >
            All

          </button>)}
      </div>
    );
  }
}

DrinksFilterButtons.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default DrinksFilterButtons;
