import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RecipeVideo extends Component {
  state = {
    video: '',
  };

  componentDidMount() {
    const { video } = this.props;
    const URL = video.replace('watch?v=', 'embed/');
    this.setState({
      video: URL,
    });
  }

  render() {
    const { video } = this.state;

    return (
      <div className="p-2">
        <h4 className="text-center">Video</h4>
        <iframe
          title="recipe video"
          width="300"
          data-testid="video"
          src={ video }
        />
      </div>
    );
  }
}

RecipeVideo.propTypes = {
  video: PropTypes.string.isRequired,
}.isRequired;
