/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(tweet){

  // let $tweet = $("<article>").addClass("tweet");

  let $tweet = $("<article class='tweet'></article>");

  let header = `
   <header class="tweet-header">
     <img src="${tweet.user.avatars.small}" class="avatar" >
     <h3>${tweet.user.name}</h3>
     <h4 class="handle">${tweet.user.handle}</h4>
   </header>
  `;

  let tweetBody = `
    <section class="tweet-body">
    ${escape(tweet.content.text)}
    </section>
  `;

  let footer = `
    <footer class="tweet-foot">
    <h5 class="post-date">${tweet.created_at}</h5>
    </footer>
  `;

  console.log("whats a tweet, ", $tweet)

  // let securedTweetBody = $("tweet-body").text(tweetBody);

$tweet.append(header);
$tweet.append(tweetBody);
$tweet.append(footer);


return $tweet;

}


function renderTweets(tweetArray) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  for(tweet of tweetArray){
    var newTweet = createTweetElement(tweet);


    $("#tweet-container").append(newTweet)
  }
}

//function with jQuery actions that need to be displayed as the error message
function reset(errorMessage){
  $( ".error-message" ).slideUp( "slow", function() {

      $( ".error-message" ).slideDown( "slow", function() {
        $(".error-message").text(errorMessage);
      });
    });
}


// creating an ajax post request :

$("form").submit(function(event){
  event.preventDefault();

  var $value = $(".new-tweet textarea").val().length;
  if($value > 140){

    reset("Character count exceeds limit!");

  } else if ( $value === 0){

    reset(" Cannot post empty field!");

  } else {
    console.log("what is this", $(this).serialize());
    $.ajax({url: '/tweets', type: 'POST', data: $( this ).serialize()})
      .then(function (){
           $(".new-tweet textarea").val('')
      })
      .then(function(){
        loadTweets();
      })

  }

});

//toggle
$("button").on("click", function(){

  $( ".new-tweet" ).slideToggle( "slow", function() {
      $("textarea").focus()
  });

})


// getting tweets with ajax

function loadTweets(){
   $.getJSON('/tweets')   //get JSON because that's the dataType we're dealing with
    .done( function(data){ // .done for situation with success
      renderTweets(data);
      console.log("this is working")
    })


}




})