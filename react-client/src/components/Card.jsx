import React from 'react';

const Card = (props) => (
  <div className='card'>
    <h3 className='card-headline'>{props.item.article_claim_phase1}</h3>
    <span className='card-description'>{props.item.original_article_text_phase2}</span>
  </div>
)

export default Card;