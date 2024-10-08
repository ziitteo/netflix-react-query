import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import useMovieGenreQuery from '../../hooks/useMovieGenre';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showMovieDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const showGenre = genreIdList => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map(id => {
      const genreObj = genreData.find(genre => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const backgroundImageStyle = movie.poster_path
    ? `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`
    : `url(https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg)`;

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        role='button'
        tabIndex='0'
        style={{
          backgroundImage: backgroundImageStyle,
        }}
        className='movie-card'
        onClick={showMovieDetail}
      >
        <div className='overlay'>
          <h1>{movie.title}</h1>
          {showGenre(movie.genre_ids).map(id => (
            <Badge bg='warning' text='dark' className='movie-genre' key={id}>
              {id}
            </Badge>
          ))}
          <div className='movie-info'>
            <div className='movie-info2'>
              <div>{movie.vote_average}</div>
              <div>{movie.popularity}</div>
            </div>
            <div className={`movie-age ${movie.adult ? 'adult' : 'all'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
