import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphyResults: [],
      errorMessage: null,
    };
  }

// componentDidMount() {
//   this.fetchGiphy('cute kitten');
// }


fetchGiphy(searchTerm) {
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

  fetch(queryUrl)
    .then(res => res.json())
    .then(JSON => this.setState({ giphyResults: JSON.data }))
    .catch(err => console.log('an error occurred: ', err));
}

copyGiphyUrl(giphyUrl) {
  const textField = document.createElement('textarea')
  textField.innerText = giphyUrl;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
}

  render() {
    return (
      <section className="App">
      <form>
        <input type="text" name="search" placeholder="Search for a Giphy" label="Search for a giphy" onChange={(e) => this.setState({ searchTerm: e.target.value }) } />
        <button type="submit" children="Search" disabled={!this.state.searchTerm} 
        onClick={(e) => {
          e.preventDefault();
          this.fetchGiphy(this.state.searchTerm);
        }} />
      </form>

        {this.state.errorMessage && <p>{ this.state.errorMessage } </p>}

        {this.state.giphyResults.length ? this.state.giphyResults.map(giphy => {
          return <img src={giphy.images.downsized_medium.url} key={giphy.id} onClick={(e) => this.copyGiphy(e.target.src)}/>
        })
        : <p>Search for a giphy</p>
        }
      </section>
    );
  }
}

export default App;
