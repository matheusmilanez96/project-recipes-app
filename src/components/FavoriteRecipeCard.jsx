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
      <section className="flex flex-col items-center w-full">
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
          <Link to={ `/${type}s/${id}` } className="flex justify-center">
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="recipe"
              className="rounded-full w-20"
            />
          </Link>
          <div className="flex justify-center">
            <button
              id={ id }
              onClick={ () => handleUnlikeBtn(id) }
              className="flex justify-center m-2"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="desfavoritar"
              />
            </button>
          </div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="text-center text-red-400 font-bold text-xl"
          >
            {`${category} ${alcoholic}`}
          </p>
          <Link to={ `/${type}s/${id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="text-center text-red-400 font-bold text-xl"
            >
              {name}
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {doneDate}
          </p>
          <div className="flex justify-center">
            <button
              onClick={ () => this.copyToClipboard() }
              className="flex justify-center"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
            </button>
          </div>
          {(linkCopied === true)
          && <p>Link copied!</p> }
          <div>
            {!tags || tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
                className="flex justify-center"
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
