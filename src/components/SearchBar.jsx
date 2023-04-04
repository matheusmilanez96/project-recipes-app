import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchType: '',
  };

  handleRadioButtons = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchType } = this.state;
    return (
      <div>
        <section>
          <label>
            Ingredientes
            <input
              type="radio"
              name="searchType"
              value="ingredient"
              onChange={ this.handleRadioButtons }
              data-testid="ingredient-search-radio"
            />
          </label>
          <label>
            Nome
            <input
              type="radio"
              name="searchType"
              value="name"
              onChange={ this.handleRadioButtons }
              data-testid="name-search-radio"
            />
          </label>
          <label>
            Primeira Letra
            <input
              type="radio"
              name="searchType"
              value="first-letter"
              onChange={ this.handleRadioButtons }
              data-testid="first-letter-search-radio"
            />
          </label>
        </section>
        <button
          type="button"
          // onClick={ console.log(searchType) }
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
