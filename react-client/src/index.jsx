import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Banner from './components/Banner.jsx';
import Timer from './components/Timer.jsx';
import CardsContainer from './components/CardsContainer.jsx';
import ScoreHeader from './components/ScoreHeader.jsx';
import RoundTracker from './components/RoundTracker.jsx';
import GameOverModal from './components/GameOverModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCards: [],
      trueCards: [],
      falseCards: [],
      playerAnswers: [],
      gameRoundNum: 1,
      score: 0,
      showModal: false,
    }
    this.expirationTime = Date.now() + 20000;
    this.onTimeExpired = this.onTimeExpired.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.gameover = this.gameover.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    $.ajax({
      url: '/cards',
      success: (data) => {
        console.log(data)
        this.setState({
          trueCards: data.true,
          falseCards: data.false
        })
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.updateCards();
      }
    });
  }

  onTimeExpired() {
    this.gameover();
  }

  onCardClick(event) {
    console.log(event.target.id)
    console.log('I clicked a card!!')
    if (this.state.gameRoundNum < 10) {
      this.state.gameRoundNum++;
      console.log('now we are on game round: ', this.state.gameRoundNum)
      if (event.target.id === 'TRUE') {
        this.state.score += 10;
        this.state.playerAnswers.push('correct');
        console.log('I found the true news!')
      } else {
        this.state.playerAnswers.push('incorrect');
      }
      this.updateCards();
    } else if (this.state.gameRoundNum === 10) {
      if (event.target.id === 'TRUE') {
        this.setState({ score: this.state.score + 10 });
        this.state.playerAnswers.push('correct');
        this.gameover();
      } else {
        console.log('game over!! 10 rounds are up!')
        this.state.playerAnswers.push('incorrect');
        this.gameover();
      }
    }

  }

  updateCards() {
    let index = Math.round(Math.random());
    let gameRoundIndex = this.state.gameRoundNum - 1; // change from 1-indexed to 0-indexed
    let currentCardOrder = [];
    if (index === 0) {
      currentCardOrder = [this.state.trueCards[gameRoundIndex], this.state.falseCards[gameRoundIndex]];
    } else {
      currentCardOrder = [this.state.falseCards[gameRoundIndex], this.state.trueCards[gameRoundIndex]];
    }
    this.setState({
      currentCards: currentCardOrder
    })
  }

  gameover() {
    console.log('game over!')
    this.showModal();
    console.log(this.state.showModal)
  }

  showModal() {
    this.setState({
      showModal: true
    })
  }

  restartGame() {
    this.expirationTime = Date.now() + 20000;
    this.setState({
      currentCards: [],
      trueCards: [],
      falseCards: [],
      playerAnswers: [],
      gameRoundNum: 1,
      score: 0,
      showModal: false,
    })
    this.getCards();
  }

  render() {

    return (<div>
      <Banner></Banner>
      <h1>Which news story is TRUE?</h1>
      <ScoreHeader score={this.state.score}></ScoreHeader>
      <RoundTracker gameRoundNum={this.state.gameRoundNum}></RoundTracker>
      <Timer expirationTime={this.expirationTime} onTimeExpired={this.onTimeExpired}></Timer>
      <CardsContainer currentCards={this.state.currentCards} onCardClick={this.onCardClick} />
      <GameOverModal showModal={this.state.showModal} score={this.state.score} restart={this.restartGame} state={this.state}></GameOverModal>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));