console.log("*************** Crawler Module 3 **********************");
var feedConcepts = require("./feedConcepts/concepts");
var module1Output = require("./inputs/moduleOneOutput");
var module2Output = require("./inputs/moduleTwoOutput");

formatStatement = (
  conceptData,
  typeOfConcept,
  feedStatement,
  formatedStatement
) => {
  for (let i = 0; i < conceptData.length; i++) {
    let word = feedStatement.slice(
      conceptData[i].startIndex,
      conceptData[i].endIndex
    );
    let formatedWord = "";
    if (typeOfConcept === feedConcepts.entity) {
      formatedWord = "<strong>".concat(word).concat("</strong>");
    } else if (
      typeOfConcept === feedConcepts.twitterUserName ||
      typeOfConcept === feedConcepts.hashtag
    ) {
      formatedWord = `${word.charAt(0)} <a href="http://twitter.com${
        typeOfConcept === feedConcepts.hashtag ? "/hashtag/" : "/"
      }${word.slice(1, word.length)}">${word.slice(1, word.length)}</a>`;
    } else if (typeOfConcept === feedConcepts.hyperLink) {
      formatedWord = `<a href="${word}">${word}</a>`;
    }
    formatedStatement = formatedStatement.replace(word, formatedWord);
  }
  return formatedStatement;
};

function crawlerModule3(feeds, concepts) {
  let formatedPosts = feeds.map(feed => {
    let feedStatement = feed.value;
    let formatedStatement = feedStatement;
    if (concepts.hasOwnProperty(feed.key)) {
      if (concepts[feed.key].entity) {
        formatedStatement = formatStatement(
          concepts[feed.key].entity,
          feedConcepts.entity,
          feedStatement,
          formatedStatement
        );
      }
      if (concepts[feed.key].twitterUserName) {
        formatedStatement = formatStatement(
          concepts[feed.key].twitterUserName,
          feedConcepts.twitterUserName,
          feedStatement,
          formatedStatement
        );
      }
      if (concepts[feed.key].hyperLink) {
        formatedStatement = formatStatement(
          concepts[feed.key].hyperLink,
          feedConcepts.hyperLink,
          feedStatement,
          formatedStatement
        );
      }
      if (concepts[feed.key].hashtag) {
        formatedStatement = formatStatement(
          concepts[feed.key].hashtag,
          feedConcepts.hashtag,
          feedStatement,
          formatedStatement
        );
      }
    }
    return formatedStatement;
  });
  return formatedPosts;
}

var formatedPosts = crawlerModule3(module1Output, module2Output);
console.log("formatedPosts ", formatedPosts);

//<strong>Obama</strong> visited <strong>Facebook</strong> headquarters: <ahref=”http://bit.ly/xyz”>http://bit.ly/xyz </a> @ <ahref=”http://twitter.com/elversatile”>elversatile</a>
//<strong>Obama</strong> visited <strong>Facebook</strong> headquarters: <a href="http://bit.ly/xyz">http://bit.ly/xyz</a> @ <a href="http://twitter.com/@elversatile">elversatile</a>
