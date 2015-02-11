if ($) {
  if (actions) {
    $('.user-actions-follow-button').click(function(){
      actions.follow($(this).attr('data'));
    });
    $('.user-actions-unfollow-button').click(function(){
      actions.unfollow($(this).attr('data'));
    });
  }
  $(window).bind('hashchange', function(){
    var hash = window.location.hash;
    console.log();
  }).trigger('hashchange');
}
