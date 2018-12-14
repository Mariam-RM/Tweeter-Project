$(document).ready(function() {

  $(".new-tweet textarea").on('keyup',function(){

    var $value = $(this).val().length;

    var $newValue = 140 - $value

    if ($newValue < 0){
      $("span.counter").addClass("countTooHigh")
    } else {
      $("span.counter").removeClass("countTooHigh")
    }

    $("span.counter").text($newValue);
  })
});
