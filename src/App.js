import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphyResults: [],
    };
  }

componentDidMount() {
  this.fetchGiphy('cute kitten');
}


fetchGiphy(searchTerm) {
  const apiKey = 'dc6zaTOxFJmzC';
  const queryUrl = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

  fetch(queryUrl)
    .then(res => res.json())
    .then(JSON => this.setState({ giphyResults: JSON.data }))
    .then(console.log(this.state.giphyResults))
    .catch(err => console.log('an error occurred: ', err));
}

  render() {
    return (
      <section className="App">
        {this.state.giphyResults.length ? this.state.giphyResults.map(giphy => {
          return <img src={giphy.images.downsized_medium.url} key={giphy.id} />
        })
        : <p>Search for a giphy</p>
        }
      </section>
    );
  }
}

export default App;
