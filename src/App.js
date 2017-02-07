import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphyResults: null,
      errorMessage: null,
      searchTerm: null,
      userFeedback: null,
      resultCount: 5,
      rating: 'g',
    };
  }

fetchGiphy(searchTerm) {
  const { resultCount, rating } = this.state;
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${resultCount}&rating=${rating}&api_key=${apiKey}`;

  fetch(queryUrl)
    .then(response => response.json())
    .then(JSONResponse => this.setState({ giphyResults: JSONResponse.data }))
    .catch((error) => {
      console.log('an error occurred: ', error);
      this.displayAnError('An error occurred getting those giphy\'s, please try again');
    });
}

giveUserFeedback(feedback) {
  this.setState({ userFeedback: feedback });
  setTimeout(() => { this.setState({ userFeedback: null }); }, 500);
}

displayAnError(error) {
  this.setState({ errorMessage: error});
  setTimeout(() => { this.setState({ errorMessage: null }); }, 2000);
}

copyGiphyUrl(giphyUrl) {
  this.state.userFeedback && this.setState({ userFeedback: null });
  const textField = document.createElement('textarea');
  textField.innerText = giphyUrl;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
  this.giveUserFeedback('copied to clipboard');
}

  render() {
    const { errorMessage, userFeedback, giphyResults, searchTerm, resultCount, rating } = this.state;
    return (
      <section className="App">
        <form>
          <label htmlFor="search">  Search for a Giphy:
            <input className="SearchInput"
                    type="text"
                    name="search"
                    placeholder="Search for a Giphy"
                    label="Search for a giphy"
                    onChange={(e) => this.setState({ searchTerm: e.target.value }) }
            />
          </label>
          <button type="submit"
            children="Search"
            disabled={!searchTerm}
            onClick={(e) => {
              e.preventDefault();
              errorMessage && this.setState({ errorMessage: null });
              this.fetchGiphy(searchTerm);
            }}
          />
        </form>
        <label htmlFor="result-count">  Number of results (max: 100):
            <input className="ResultCount"
                  type="number"
                  name="result-count"
                  min="0"
                  max="100"
                  value={resultCount}
                  onChange={(e) => this.setState({ resultCount: e.target.value })}
            />
        </label>
        <label htmlFor="rating-picker"> Giphy Rating:
          <select name="rating-picker" id="rating-picker" value={rating} onChange={(e) => this.setState({ rating: e.target.value })}>
            <option value="y">Y</option>
            <option value="g">G</option>
            <option value="pg">PG</option>
            <option value="pg-13">PG-13</option>
            <option value="r">R</option>
          </select>
        </label>
          <p>{ userFeedback }</p>

          <p>{ errorMessage }</p>

          {giphyResults && giphyResults.map(giphy => {
            return <img key={giphy.id}
                        role="presentation"
                        src={giphy.images.downsized_medium.url}
                        onClick={(e) => this.copyGiphyUrl(e.target.src)}
                    />;
            })
          }
      </section>
    );
  }
}

export default App;
