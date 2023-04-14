import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default class Header extends Component {
  state = {
    isSearchActive: false,
  };

  handleSearchButton = () => {
    this.setState((prevState) => ({
      isSearchActive: !prevState.isSearchActive,
    }));
  };

  render() {
    const { pageName, hasSearchIcon, recipeType, filterRecipes } = this.props;
    const { isSearchActive } = this.state;
    return (
      <div
        data-testid="header"
        className={ `${pageName === 'Drinks'
          ? 'bg-blue-300'
          : 'bg-red-300'} flex justify-between align-middle flex-wrap` }
      >
        <Link
          to="/profile"
          className="inline-flex justify-self-end m-3"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </Link>

        <p
          name={ pageName }
          data-testid="page-title"
          className="m-2 text-4xl"
        >
          { pageName }

        </p>

        {(hasSearchIcon === true)
        && (
          <button
            onClick={ this.handleSearchButton }
            className="bg-transparent inline-flex justify-self-end"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search-icon"
              className="m-3"
            />
          </button>)}

        {(isSearchActive === true)
        && (
          <SearchBar
            apiType={ recipeType }
            filterRecipes={ filterRecipes }
            pageName={ pageName }
          />
        )}

      </div>
    );
  }
}

Header.propTypes = {
  pageName: PropTypes.string,
  hasSearchIcon: PropTypes.bool,
}.isRequired;
