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
    };
  }

fetchGiphy(searchTerm) {
  const resultCount = this.state.resultCount;
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${resultCount}&api_key=${apiKey}`;

  fetch(queryUrl)
    .then(res => res.json())
    .then(JSON => this.setState({ giphyResults: JSON.data }))
    .catch((err) => {
      console.log('an error occurred: ', err);
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
    const { errorMessage, userFeedback, giphyResults, searchTerm, resultCount } = this.state;
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
        <p>{ userFeedback }</p>

        <p>{ errorMessage } </p>

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
