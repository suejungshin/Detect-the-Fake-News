import React from 'react';
import ResponseGrid from './ResponseGrid.jsx';

class GameOverModal extends React.Component {
  construtor(props) {
  }

  render() {

    if (!this.props.showModal) {
      return null;
    } else {
      return (
        <div className='modal'>
          <section className='modal-main'>
            <h2>Game Over! How did you do?</h2>
            <h3 className='modal-text'>{'Your score was: ' + this.props.score}</h3>
            <h3 className='modal-text'>The AI's score for the same data set was: 90</h3>
            <button onClick={this.props.restart}>New Game</button>
            <div>Here were your answers:</div>
            <ResponseGrid props={this.props}></ResponseGrid>
            <div className='learn-more'>How was true/false determined?
            https://www.snopes.com/faq/fact-checking-process/
            </div>
            <div>Learn more about the AI here: https://machinebox.io/docs/fakebox</div>
          </section>
        </div>
      );
    }

  }
}

export default GameOverModal;
