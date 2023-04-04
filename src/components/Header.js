import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    const { pageName, hasSearchIcon } = this.props;
    const { isSearchActive } = this.state;
    return (
      <div data-testid="header">
        {(isSearchActive === true)
        && (
          <input
            placeholder="Search Recipe"
            type="text"
            data-testid="search-input"
          />
        )}

        {(hasSearchIcon === true)
        && (
          <button
            onClick={ this.handleSearchButton }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search-icon"
            />
          </button>)}

        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </Link>

        <p name={ pageName } data-testid="page-title">{ pageName }</p>
      </div>
    );
  }
}

Header.propTypes = {
  pageName: PropTypes.string,
  hasSearchIcon: PropTypes.bool,
}.isRequired;
