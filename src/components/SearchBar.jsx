import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchInput: '',
    searchType: '',
    searchResponse: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  verifyFirstLetter = async (letter) => {
    const { searchResponse } = this.state;
    if (letter.length === 1) {
      let data = '';
      data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)).json();
      this.setState({
        searchResponse: data,
      });
      console.log(searchResponse);
    }
    return global.alert('Your search must have only 1 (one) character');
  };

  handleAPIs = async () => {
    const { searchInput, searchType, searchResponse } = this.state;

    if (searchType === 'ingredient') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)).json();
      this.setState({
        searchResponse: data,
      });
      console.log(searchResponse);
    }

    if (searchType === 'name') {
      const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)).json();
      this.setState({
        searchResponse: data,
      });
      console.log(searchResponse);
    }

    if (searchType === 'first-letter') {
      this.verifyFirstLetter(searchInput);
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
          onClick={ this.handleAPIs }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {

};

export default SearchBar;
