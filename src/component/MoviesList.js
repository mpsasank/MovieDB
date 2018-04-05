/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a2007a3b48e7414a3fab9f6bdb9966ca&language=en-US&region=IN');
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-row-gap: 1.5rem;
`;