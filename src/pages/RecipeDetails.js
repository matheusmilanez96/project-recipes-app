import React, { Component } from 'react';

export default class RecipeDetails extends Component {
  // async componentDidMount() {
  //   const { history: { location: { pathname } } } = this.props;
  //   console.log(pathname);
  //   const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname}`)).json();
  // }

  render() {
    return (
      <div>
        RecipeDetails
      </div>
    );
  }
}
