/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){


//function preventing cross site scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet){


  let $tweet = $("<article class='tweet'></article>");

  let header = `
   <header class="tweet-header">
      <div class ="leftside">
         <img src="${tweet.user.avatars.small}" class="avatar" >
         <h2>${tweet.user.name}</h2>
     </div>
     <div class="handle">
        <h4>${tweet.user.handle}</h4>
    </div>
   </header>
  `;

  let tweetBody = `
    <section class="tweet-body">
    <p>${escape(tweet.content.text)}</p>
    </section>
  `;

  let footer = `
    <footer class="tweet-foot">
      <h5 class="post-date">${moment(tweet.created_at).fromNow()}</h5>
      <div class="icons">
        <i class="material-icons"> outlined_flag </i>
        <i class="material-icons"> repeat </i>
        <i class="material-icons">favorite_border </i>
      </div>
    </footer>
  `;


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
    $("#tweet-container").prepend(newTweet); // changed to prepend so newest tweets appear first
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
});


// getting tweets with ajax

function loadTweets(){
   $.getJSON('/tweets')   //get JSON because that's the dataType we're dealing with
    .done( function(data){ // .done for situation with success
      renderTweets(data);
      console.log("this is working")
    })
};


});