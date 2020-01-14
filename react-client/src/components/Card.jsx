import React from 'react';

const Card = (props) => {

  let id = props.article.fact_rating_phase1;

  return (
    <div className='card' id={id}>
      <h3 className='card-headline' onClick={props.onCardClick} id={id}>{props.article.article_title_phase2}</h3>
      <span id={id}>{props.article.article_date_phase1}</span>
      <span className='card-description' onClick={props.onCardClick} id={id}>{props.article.original_article_text_phase2}</span>
      <span id={id}>{id}</span>
      <span id={id}>{props.article.article_origin_url_phase1}</span>
    </div>
  )
}

export default Card;