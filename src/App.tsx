/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

type State = {
  query: string;
};

export class App extends React.Component<{}, State> {
  state: State = {
    query: '',
  };

  handleSearch = (value: string) => {
    this.setState({ query: value });
  };

  filterMovies = () => {
    const queryFilter = this.state.query.toLowerCase();

    return moviesFromServer.filter((movie) => {
      const { title, description } = movie;

      return title.toLocaleLowerCase().includes(queryFilter)
        || description.toLocaleLowerCase().includes(queryFilter);
    });
  };

  render() {
    const { query } = this.state;
    const visibleMovies = this.filterMovies();

    return (
      <div className="page">
        <div className="page-content">
          <div className="box">
            <div className="field">
              <label htmlFor="search-query" className="label">
                Search movie
              </label>

              <div className="control">
                <input
                  type="text"
                  id="search-query"
                  className="input"
                  placeholder="Type search word"
                  value={query}
                  onChange={(event) => this.handleSearch(event.target.value)}
                />
              </div>
            </div>
          </div>

          <MoviesList movies={visibleMovies} />
        </div>
        <div className="sidebar">
          Sidebar goes here
        </div>
      </div>
    );
  }
}