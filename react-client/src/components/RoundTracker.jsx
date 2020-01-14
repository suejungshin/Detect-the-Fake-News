import React from 'react';
import Resentence from 'resentence';

const RoundTracker = (props) => {
  return (
    <Resentence align='center' className='game-round-number'>{'Round ' + props.gameRoundNum + ' of 10'}</Resentence>
  )
}

export default RoundTracker;