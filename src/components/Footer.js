import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    return (
      <div data-testid="footer" className="footer">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="drink icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="meal icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    );
  }
}

export default Footer;
