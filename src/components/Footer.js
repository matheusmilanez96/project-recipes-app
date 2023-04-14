import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends Component {
  render() {
    const { changePageName, pageName } = this.props;
    return (
      <div
        data-testid="footer"
        className={ ` ${pageName === 'Drinks' ? 'bg-blue-300'
          : 'bg-red-300'} flex place-content-around p-2.5 fixed bottom-0 w-full` }
      >
        <Link to="/drinks" onClick={ () => changePageName('/drinks') }>
          <img
            src={ drinkIcon }
            alt="drink icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals" onClick={ () => changePageName('/meals') }>
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

Footer.propTypes = {
  pageName: PropTypes.string.isRequired,
  changePageName: PropTypes.func.isRequired,
};

export default Footer;
