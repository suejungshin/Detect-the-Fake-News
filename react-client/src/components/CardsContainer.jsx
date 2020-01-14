import React from 'react';
import Card from './Card.jsx';

const CardsContainer = (props) => (
  <div className='cards-container'>
    { props.currentCards.map(article => <Card key={article._id} article={article} onCardClick={props.onCardClick}/>)}
  </div>
)

export default CardsContainer;