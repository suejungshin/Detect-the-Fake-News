import React from 'react';
import Card from './Card.jsx';

const CardsContainer = (props) => (
  <div className='cards-container'>
    { props.items.map(item => <Card item={item}/>)}
  </div>
)

export default CardsContainer;