console.log("*************** Crawler Module 3 **********************");
/**
 * Module 1 output assuming to be in the below format
 */
var module1Output = [
  { "key": 1,
    "value": "Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile" },
   {
    "key": 2,
    "value": "Trump visited Microsoft headquarters: http://bit.ly/xyz @donaldtrump #President #microsoft"
  }
];

/**
 * Module 2 output assuming to be in the below format
 */
var module2Output = 
  {
    "1": {
      entity: [
        { startIndex: 14, endIndex: 22 },
        { startIndex: 0, endIndex: 5 }
      ],
      twitterUserName: [{ startIndex: 55, endIndex: 67 }],
      hyperLink: [{ startIndex: 37, endIndex: 54 }]
    },
    "2": {
        entity: [
          { startIndex: 14, endIndex: 23 },
          { startIndex: 0, endIndex: 5 }
        ],
        twitterUserName: [{ startIndex: 56, endIndex: 68 }],
        hyperLink: [{ startIndex: 38, endIndex: 55 }],
        hashtag: [{ startIndex: 69, endIndex: 79 },
                    { startIndex: 80, endIndex: 90 },
                  ]
      }
  };
function crawlerModule3(feeds, concepts){
     console.log("feeds, concepts");
     let formatedPosts = feeds.map((feed)=>{
        console.log("formatedPosts");
           let feedStatement = feed.value;
           let formatedStatement = feedStatement;
           console.log("feed.key",feed.key);
        if(concepts.hasOwnProperty(feed.key)){
            console.log("ownprop");
           
            if(concepts[feed.key].entity) {
                let conceptEntity = concepts[feed.key].entity;
                for(let i=0 ; i < conceptEntity.length; i++){
                    let word = feedStatement.slice(conceptEntity[i].startIndex, conceptEntity[i].endIndex);
                    console.log('entity word ',i, ' ',word);
                    let formatedWord = '<strong>'.concat(word).concat('</strong>');
                    formatedStatement = formatedStatement.replace(word,formatedWord);
                }
            }

            if(concepts[feed.key].twitterUserName) {
                let conceptTwitterUserName = concepts[feed.key].twitterUserName;
                for(let i=0 ; i < conceptTwitterUserName.length; i++){
                    let word = feedStatement.slice(conceptTwitterUserName[i].startIndex, conceptTwitterUserName[i].endIndex);
                    console.log(' twitterUserName word ',i, ' ',word);
                    //<ahref=”http://twitter.com/elversatile”>elversatile</a>
                    let formatedWord = `${word.charAt(0)} <a href="http://twitter.com/${word.slice(1,word.length)}">${word.slice(1,word.length)}</a>`;
                    formatedStatement = formatedStatement.replace(word,formatedWord);
                }
            }

            if(concepts[feed.key].hyperLink) {
                let conceptHyperLink = concepts[feed.key].hyperLink;
                for(let i=0 ; i < conceptHyperLink.length; i++){
                    let word = feedStatement.slice(conceptHyperLink[i].startIndex, conceptHyperLink[i].endIndex);
                    console.log(' hyperLink word ',i, ' ',word);
                    let formatedWord = `<a href="${word}">${word}</a>`;
                    formatedStatement = formatedStatement.replace(word,formatedWord);
                }
            }

            if(concepts[feed.key].hashtag) {
                let conceptHashtag = concepts[feed.key].hashtag;
                for(let i=0 ; i < conceptHashtag.length; i++){
                    let word = feedStatement.slice(conceptHashtag[i].startIndex, conceptHashtag[i].endIndex);
                    console.log('hashtag word ',i, ' ',word);
                    let formatedWord = `${word.charAt(0)} <a href="http://twitter.com/hashtag/${word.slice(1,word.length)}">${word.slice(1,word.length)}</a>`;
                    formatedStatement = formatedStatement.replace(word,formatedWord);
                }
            }
            console.log('formatedStatement ',formatedStatement);
        }
        return formatedStatement;
     })
     return formatedPosts;
}

var formatedPosts = crawlerModule3(module1Output, module2Output);
console.log('formatedPosts ',formatedPosts);

//<strong>Obama</strong> visited <strong>Facebook</strong> headquarters: <ahref=”http://bit.ly/xyz”>http://bit.ly/xyz </a> @ <ahref=”http://twitter.com/elversatile”>elversatile</a>
//<strong>Obama</strong> visited <strong>Facebook</strong> headquarters: <a href="http://bit.ly/xyz">http://bit.ly/xyz</a> @ <a href="http://twitter.com/@elversatile">elversatile</a>