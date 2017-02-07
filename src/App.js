import React, { Component } from 'react';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphySearchResults: null,
      errorMessage: null,
      userFeedback: null,
    };
  }

fetchGiphy(queryUrl) {
  this.state.errorMessage && this.setState({ errorMessage: null });

  fetch(queryUrl)
    .then(response => response.json())
    .then(JSONResponse => this.setState({ giphySearchResults: JSONResponse.data }))
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
    const { giphySearchResults, errorMessage, userFeedback } = this.state;
    return (
      <section className="App">
      <Header handleSubmit={(queryUrl) => this.fetchGiphy(queryUrl)}/>

          <p>{ userFeedback }</p>

          <p>{ errorMessage }</p>

          {giphySearchResults && giphySearchResults.map(giphy => {
            return <img key={giphy.id}
                        role="presentation"
                        src={giphy.images.fixed_height.url}
                        onClick={(e) => this.copyGiphyUrl(e.target.src)}
                    />;
            })
          }
      </section>
    );
  }
}

export default App;
