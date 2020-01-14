import React from 'react';

const ResponseGrid = (props) => {
  return (
    <div className='answer-grid'>
      <div className='grid-header'>YOUR ANSWER</div>
      {props.props.state.playerAnswers.map((element, index) => <div key={index}>{element}</div>)}
      <div className='grid-header'>TRUE</div>
      {props.props.state.trueCards.map((element, index) => <div key={index} className='true-card'>{element.article_title_phase2}</div>)}
      <div className='grid-header'>FALSE</div>
      {props.props.state.falseCards.map((element, index) => <div key={index} className='false-card'>{element.article_title_phase2}</div>)}
    </div>
  )
}

export default ResponseGrid;
