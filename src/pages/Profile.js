import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Profile extends Component {
  state = {
    pageName: 'Profile',
    hasSearchIcon: false,
  };

  render() {
    const { pageName, hasSearchIcon } = this.state;
    return (
      <div>
        <Header pageName={ pageName } hasSearchIcon={ hasSearchIcon } />
        <Footer />
      </div>
    );
  }
}
