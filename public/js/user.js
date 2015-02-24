if ($) {
  if (actions) {
    $('.user-actions-follow-btn').click(function(){
      $this = $(this);
      if($this.parent().hasClass('following')){
        actions.unfollow($this.parent().attr('data-user-id'), function(data){
          $this.parent().removeClass('following');
          $this.parent().addClass(data.new_state);
        });
      }
      else{
        actions.follow($this.parent().attr('data-user-id'), function(data){
          $this.parent().removeClass('not-following');
          $this.parent().addClass(data.new_state);
        });
      }
    });
  }
  $(window).bind('hashchange', function(){
    var hash = window.location.hash;
    console.log();
  }).trigger('hashchange');
}
