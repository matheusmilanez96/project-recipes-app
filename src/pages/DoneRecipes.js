import React, { Component } from 'react';
import Header from '../components/Header';

export default class DoneRecipes extends Component {
  state = {
    pageName: 'Done Recipes',
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
