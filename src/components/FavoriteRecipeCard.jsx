import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class FavoriteRecipeCard extends Component {
  state = {
    linkCopied: false,
  };

  copyToClipboard = () => {
    const { type, id } = this.props;
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    this.setState({
      linkCopied: true,
    });
  };

  render() {
    const { index,
      image,
      name,
      category,
      doneDate,
      tags,
      id,
      alcoholic,
      type,
      handleUnlikeBtn } = this.props;

    const { linkCopied } = this.state;

    return (
      <section>
        <div
          className="recipeCard"
          key={ id }
          style={ { border: '1px solid black',
            borderRadius: '30px',
            padding: '10px',
            margin: '10px',
            backgroundColor: 'lightgray',
            color: 'black' } }
        >
          <Link to={ `/${type}s/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="recipe"
              style={ { width: '50px', height: '50px', borderRadius: '30px' } }
            />
          </Link>
          <button
            id={ id }
            onClick={ () => handleUnlikeBtn(id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="desfavoritar"
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${category} ${alcoholic}`}
          </p>
          <Link to={ `/${type}s/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {doneDate}
          </p>
          <button
            onClick={ () => this.copyToClipboard() }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
            />
            Compartilhar
          </button>
          {(linkCopied === true)
          && <p>Link copied!</p> }
          <div>
            {!tags || tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

FavoriteRecipeCard.propTypes = {
  name: PropTypes.string,
  index: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  nationality: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
