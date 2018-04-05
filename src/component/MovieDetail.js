/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from "react";
import styled from "styled-components";
import Overdrive from "react-overdrive";
import { Poster } from "./Movie";
import "./MovieDetail.css";

let numeral = require("numeral");

const POSTER_PATH = "https://image.tmdb.org/t/p/w300";

class MovieDetail extends Component {
  state = {
    movie: {}
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=a2007a3b48e7414a3fab9f6bdb9966ca&language=en-US`
      );
      const movie = await res.json();
      this.setState({
        movie
      });
      document.body.style.backgroundImage = "url('https://image.tmdb.org/t/p/original" + movie.backdrop_path + "')";
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() { 
    document.body.style.backgroundImage = "";
  }

  render() {
    const { movie } = this.state;
    let totalRevenue = movie.revenue;

    if (totalRevenue === "undefined" || totalRevenue === 0) {
      totalRevenue = "-";
    } else {
      totalRevenue = numeral(movie.revenue).format("($0,0)");
    }

    return (
      <div className="movieInfo">
        <Overdrive id={`${movie.id}`} className="poster">
          <Poster
            src={
              movie.poster_path === null
                ? "http://via.placeholder.com/300x450"
                : `${POSTER_PATH}${movie.poster_path}`
            }
            alt={movie.title}
          />
        </Overdrive>
        <div className="details">
          <div className="title_wrap">
            <div className="title">{movie.title}</div>
            <div className="tagline meta-data">{movie.tagline}</div>
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="additional_details">
            <div className="realease_date">
              Release Date:
              <div className="meta-data">{movie.release_date}</div>
            </div>
            <div className="runtime">
              Runtime:
              <div className="meta-data">{movie.runtime} min</div>
            </div>
            <div className="totalRevenue">
              Box Office:
              <div className="meta-data">{totalRevenue}</div>
            </div>
            <div className="vote_average">
              Vote Average:
              <div className="meta-data">{movie.vote_average}/10</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString;
  nestedArray.forEach(function(item, i) {
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(", "); // array to string
  return resultString;
}

export default MovieDetail;
