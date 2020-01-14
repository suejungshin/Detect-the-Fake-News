import React from 'react';
import Resentence from 'resentence';

const ScoreHeader = (props) => {
  return (
    <Resentence align='center' className="score">{'Your score: ' + props.score}</Resentence>
  )
}

export default ScoreHeader;