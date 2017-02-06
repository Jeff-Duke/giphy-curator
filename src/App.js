import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphyResults: null,
      errorMessage: null,
    };
  }

fetchGiphy(searchTerm) {
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

  fetch(queryUrl)
    .then(res => res.json())
    .then(JSON => this.setState({ giphyResults: JSON.data }))
    .catch(err => console.log('an error occurred: ', err));
}

copyGiphyUrl(giphyUrl) {
  const textField = document.createElement('textarea');
  textField.innerText = giphyUrl;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
}

  render() {
    const { errorMessage, giphyResults, searchTerm } = this.state;
    return (
      <section className="App">
      <form>
        <label htmlFor="search">Search for a Giphy:  </label>
        <input type="text" name="search" placeholder="Search for a Giphy" label="Search for a giphy" onChange={(e) => this.setState({ searchTerm: e.target.value }) } />
        <button type="submit" children="Search" disabled={!searchTerm}
        onClick={(e) => {
          e.preventDefault();
          this.fetchGiphy(searchTerm);
        }} />
      </form>

        {errorMessage && <p>{ errorMessage } </p>}

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
