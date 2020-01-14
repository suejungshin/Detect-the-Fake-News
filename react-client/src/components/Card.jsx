import React from 'react';

const Card = (props) => {

  let id = props.article.fact_rating_phase1;

  return (
    <div className='card' id={id}>
      <h3 className='card-headline' onClick={props.onCardClick} id={id}>{props.article.article_title_phase2}
        <div className='date' id={id}>{props.article.article_date_phase1}</div>
      </h3>

      <div className='card-description' onClick={props.onCardClick} id={id}>{props.article.original_article_text_phase2}</div>
      <div id={id} className='article-url'>{props.article.article_origin_url_phase1}</div>
      {/* <div id={id}>{id}</div> */}
    </div>
  )
}

export default Card;