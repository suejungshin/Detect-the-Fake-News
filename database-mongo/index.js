var mongoose = require('mongoose');
const dbName = 'mvp';
mongoose.connect(`mongodb://localhost/${dbName}`);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// var articleSchema = mongoose.Schema({
//   fact_rating_phase1: String,
//   snopes_url_phase1: String,
//   article_title_phase1: String,
//   article_category_phase1: String,
//   article_date_phase1: String,
//   article_claim_phase1: String,article_origin_url_phase1: String,index_paragraph_phase1: String,page_is_first_citation_phase1: String,
//   error_phase2: String,
//   original_article_text_phase2: String,article_title_phase2: String,
//   publish_date_phase2: String,
//   author_phase2: String,
// });

var articleSchema = new mongoose.Schema({
  fact_rating_phase1: String,
  snopes_url_phase1: String,
  article_title_phase1: String,
  article_category_phase1: String,
  article_date_phase1: String,
  article_claim_phase1: String,article_origin_url_phase1: String,index_paragraph_phase1: String,page_is_first_citation_phase1: String,
  error_phase2: String,
  original_article_text_phase2: String,article_title_phase2: String,
  publish_date_phase2: String,
  author_phase2: String,
}, { collection: 'articles' });

var Article = mongoose.model('articles', articleSchema);

var findTrueCards = function(callback) {
  Article.aggregate([
    {$match: {fact_rating_phase1:'TRUE'}},
    {$sample: {size: 10}}
  ], function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var findFalseCards = function(callback) {
  Article.aggregate([
    {$match: {fact_rating_phase1:'FALSE'}},
    {$sample: {size: 10}}
  ], function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


module.exports.findTrueCards = findTrueCards;
module.exports.findFalseCards = findFalseCards;