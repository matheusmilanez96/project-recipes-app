import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealsFilterButtons extends Component {
  state = {
    filteredCategory: '',
    categories: '',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();

    this.setState({
      categories,
    });
  };

  handleFilter = async ({ target: { id } }) => {
    const { filterRecipes } = this.props;
    const { filteredCategory } = this.state;
    let filteredRecipes = '';

    if (filteredCategory !== id && id !== 'all') {
      filteredRecipes = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)).json();
      this.setState({
        filteredCategory: id,
      });
    } else {
      filteredRecipes = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
      this.setState({
        filteredCategory: '',
      });
    }
    filterRecipes(filteredRecipes);
  };

  render() {
    const { categories: { meals }, filteredCategory } = this.state;
    const five = 5;

    return (
      <div className="flex flex-wrap justify-center pb-20 px-1">
        {meals && meals.reduce((acc, curr, index) => {
          if (index < five) {
            const button = (
              <div key={ curr.strCategory }>
                <button
                  id={ curr.strCategory }
                  onClick={ this.handleFilter }
                  data-testid={ `${curr.strCategory}-category-filter` }
                  className="bg-red-500 mx-2 my-1 px-2 py-1 rounded-md hover:bg-orange-500
                   text-white font-bold"
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
            className="bg-red-500 mx-2 my-1 px-2 py-1 rounded-md hover:bg-orange-500
                   text-white font-bold"
          >
            All
          </button>)}
      </div>
    );
  }
}

MealsFilterButtons.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default MealsFilterButtons;
