import React, { Component } from 'react';
import Header from '../components/Header';

export default class FavoriteRecipes extends Component {
  state = {
    pageName: 'Favorite Recipes',
    hasSearchIcon: false,
  };

  render() {
    const { pageName, hasSearchIcon } = this.state;
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
      </div>
    );
  }
}
