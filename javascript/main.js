jQuery(document).ready(function ($) {

  var now = moment();
  var $dates = $('.date');
  var $games = $('.game');

  $dates.each(function() {
    var $date = $(this);
    var start = moment($date.attr('datetime'));

    if (moment(now).isSame(start, 'day')) {
      $date.addClass('is-today');
      $('html, body').animate({
        scrollTop: $date.offset().top
      }, 1);
    }
  });

  $games.each(function() {
    var $game = $(this);
    var start = moment($game.attr('datetime'));
    var end = moment(start).add(105, 'm');
    var $time = $game.children('.time');

    $time.text(moment(start).format('HH:mm'));
    $time.css('visibility', 'visible');

    if (moment(now).isBetween(start, end)) {
      $game.addClass('is-now');
      $time.text('Now');
    }
  });

});
