import React, { Component } from 'react';
import Header from './Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      giphySearchResults: null,
      errorMessage: '',
      userFeedback: '',
    };
  }

fetchGiphy(queryUrl) {
  this.setState({ errorMessage: '' });

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
  setTimeout(() => { this.setState({ userFeedback: '' }); }, 1000);
}

displayAnError(error) {
  this.setState({ errorMessage: error});
  setTimeout(() => { this.setState({ errorMessage: '' }); }, 2000);
}

copyGiphyUrl(giphyUrl) {
  this.setState({ userFeedback: '' });
  const textField = document.createElement('textarea');
  textField.innerText = giphyUrl;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
  this.giveUserFeedback('Link copied to clipboard');
}

  render() {
    const { giphySearchResults, errorMessage, userFeedback } = this.state;
    return (
      <section className='App'>
        <Header handleSubmit={(queryUrl) => this.fetchGiphy(queryUrl)}
                errorMessage={errorMessage}
                userFeedback={userFeedback}
        />
        <section className='GiphySearchResults'>
          {giphySearchResults && giphySearchResults.map(giphy => {
            return <img key={giphy.id}
                      className='Giphy'
                      role='presentation'
                      src={giphy.images.fixed_height.url}
                      onClick={(e) => this.copyGiphyUrl(e.target.src)}
                  />;
            })
          }
        </section>
      </section>
    );
  }
}
