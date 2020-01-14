import React from 'react';

const Card = (props) => (
  <div className='card-outline'>
    <div className='card'>
      <h4>{props.item.article_claim_phase1}</h4>
      <span>{props.item.original_article_text_phase2}</span>
    </div>
  </div>
)

export default Card;