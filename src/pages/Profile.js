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
    let email = '';
    if (localStorage.getItem('user') !== null) {
      const user = JSON.parse(localStorage.getItem('user'));
      email = user.email;
    }
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <div
          className="min-h-screen flex flex-col items-center justify-center space-y-20"
        >
          <h4
            data-testid="profile-email"
            className="border-2 border-black justify bg-yellow-900/70 rounded-lg p-3
              text-white backdrop-blur-[1.5px]"
          >
            { email }
          </h4>
          <Link to="/done-recipes">
            <button
              data-testid="profile-done-btn"
              className="justify bg-red-500 rounded-lg p-1.5
                text-white backdrop-blur-[1.5px] text-xl px-3"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              data-testid="profile-favorite-btn"
              className="justify bg-red-500 rounded-lg p-1.5
                text-white backdrop-blur-[1.5px] text-xl px-3"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
              className="justify bg-red-500 rounded-lg p-1.5
                text-white backdrop-blur-[1.5px] text-xl px-3"
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
