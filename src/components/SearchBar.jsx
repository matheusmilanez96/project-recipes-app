import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchInput: '',
    searchType: '',
    searchResponse: { meals: [] },
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  triggerAlert = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  verifyMealsFirstLetter = async (letter) => {
    if (letter.length === 1) {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)).json();
      this.setState(
        {
          searchResponse: data,
        },
        () => {
          const { searchResponse } = this.state;
          if (!searchResponse.meals) {
            this.triggerAlert();
            return;
          }
          this.handleMealsHistory(searchResponse);
        },
      );
    } else {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  handleMealsAPIs = async () => {
    const { searchInput, searchType } = this.state;
    if (searchType === 'ingredient') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)).json();
      this.setState(
        {
          searchResponse: data,
        },
        () => {
          const { searchResponse } = this.state;
          if (!searchResponse.meals) {
            this.triggerAlert();
            return;
          }
          this.handleMealsHistory(searchResponse);
        },
      );
    }

    if (searchType === 'name') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)).json();
      this.setState(
        {
          searchResponse: data,
        },
        () => {
          const { searchResponse } = this.state;
          if (!searchResponse.meals) {
            this.triggerAlert();
            return;
          }
          this.handleMealsHistory(searchResponse);
        },
      );
    }
    if (searchType === 'first-letter') {
      this.verifyMealsFirstLetter(searchInput);
    }
  };

  verifyDrinksFirstLetter = async (letter) => {
    if (letter.length === 1) {
      const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)).json();
      this.setState(
        {
          searchResponse: data,
        },
        () => {
          const { searchResponse } = this.state;
          if (!searchResponse.drinks) {
            this.triggerAlert();
            return;
          }
          this.handleDrinksHistory(searchResponse);
        },
      );
    } else {
      return global.alert('Your search must have only 1 (one) character');
    }
  };

  handleDrinksAPIs = async () => {
    const { searchInput, searchType } = this.state;
    if (searchType === 'ingredient') {
      try {
        const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)).json();
        this.setState(
          {
            searchResponse: data,
          },
          () => {
            const { searchResponse } = this.state;
            this.handleDrinksHistory(searchResponse);
          },
        );
      } catch (error) {
        this.triggerAlert();
      }
    }

    if (searchType === 'name') {
      const data = await (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)).json();
      this.setState(
        {
          searchResponse: data,
        },
        () => {
          const { searchResponse } = this.state;
          if (!searchResponse.drinks) {
            this.triggerAlert();
            return;
          }
          this.handleDrinksHistory(searchResponse);
        },
      );
    }

    if (searchType === 'first-letter') this.verifyDrinksFirstLetter(searchInput);
  };

  handleMealsHistory = (data) => {
    const { history, filterRecipes } = this.props;
    if (data.meals.length === 1) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    } else {
      filterRecipes(data);
    }
  };

  handleDrinksHistory = (data) => {
    const { history, filterRecipes } = this.props;

    if (data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    } else {
      filterRecipes(data);
    }
  };

  handlePathName = async () => {
    const { apiType } = this.props;
    if (apiType === '/meals') {
      await this.handleMealsAPIs();
    } else {
      await this.handleDrinksAPIs();
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        <section>
          <input
            placeholder="Search Recipe"
            type="text"
            data-testid="search-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
          <label>
            Ingredientes
            <input
              type="radio"
              name="searchType"
              value="ingredient"
              onChange={ this.handleChange }
              data-testid="ingredient-search-radio"
            />
          </label>
          <label>
            Nome
            <input
              type="radio"
              name="searchType"
              value="name"
              onChange={ this.handleChange }
              data-testid="name-search-radio"
            />
          </label>
          <label>
            Primeira Letra
            <input
              type="radio"
              name="searchType"
              value="first-letter"
              onChange={ this.handleChange }
              data-testid="first-letter-search-radio"
            />
          </label>
        </section>
        <button
          type="button"
          onClick={ this.handlePathName }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  apiType: PropTypes.string,
}.isRequired;

export default withRouter(SearchBar);
