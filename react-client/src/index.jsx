import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Banner from './components/Banner.jsx';
import CardsContainer from './components/CardsContainer.jsx';
import ScoreHeader from './components/ScoreHeader.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      score: 78,
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: [data[0], data[1]],
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <Banner></Banner>
      <h1>Can you spot the fake news?</h1>
      <ScoreHeader score={this.state.score}></ScoreHeader>
      <CardsContainer items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));