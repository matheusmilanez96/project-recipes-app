import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Profile extends Component {
  state = {
    pageName: 'Profile',
    hasSearchIcon: false,
  };

  render() {
    const { pageName, hasSearchIcon } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <div>
          <h4 data-testid="profile-email">
            { user.email }
          </h4>
          <Link to="/done-recipes">
            <button data-testid="profile-done-btn">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}
