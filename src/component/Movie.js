import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w300';

const Movie = ({ movie }) => (
  <Link to={`/${movie.id}`}>
    <Overdrive id={`${movie.id}`}>
      <Poster src={movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Overdrive>
  </Link>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
`;