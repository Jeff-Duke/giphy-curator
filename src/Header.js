import React, { Component } from 'react';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: null,
      resultCount: 5,
      rating: 'g'
    };
  }

  createGiphyQueryUrl() {
  const { searchTerm, resultCount, rating } = this.state;
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${resultCount}&rating=${rating}&api_key=${apiKey}`;
  this.props.handleSubmit(queryUrl);
}

  render() {
    const { searchTerm, resultCount, rating } = this.state;
    const { userFeedback, errorMessage } = this.props;
    return(
      <section className='Header'>
      <h1>Giphy Curator</h1>
        <form id='SearchInput'>
          <label htmlFor='search'>  Search for a Giphy
            <input type='text'
                   name='search'
                   className='SearchInput'
                   placeholder='Search for a Giphy'
                   label='Search for a giphy'
                   onChange={(e) => this.setState({ searchTerm: e.target.value }) }
            />
          </label>

          <button type='submit'
            className='SearchButton'
            children='Search'
            disabled={!searchTerm}
            onClick={(e) => {
              e.preventDefault();
              this.createGiphyQueryUrl();
            }}
          />
        </form>
        <label htmlFor='result-count'>  Number of results (max: 100)
            <input className='ResultCount'
                  type='number'
                  name='result-count'
                  min='0'
                  max='100'
                  value={resultCount}
                  onChange={(e) => this.setState({ resultCount: e.target.value })}
            />
        </label>
        <label htmlFor='rating-picker'> Giphy Rating:
          <select name='rating-picker' id='rating-picker' value={rating} onChange={(e) => this.setState({ rating: e.target.value })}>
            <option value='y'>Y</option>
            <option value='g'>G</option>
            <option value='pg'>PG</option>
            <option value='pg-13'>PG-13</option>
            <option value='r'>R</option>
          </select>
        </label>
        <p className='HeaderFeedback'>{ userFeedback }</p>
        <p className='HeaderError'>{ errorMessage }</p>
      </section>
    )
  }
}
