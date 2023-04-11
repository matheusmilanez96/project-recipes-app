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
    console.log(video);

    return (
      <div>
        <h4>Video</h4>
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
