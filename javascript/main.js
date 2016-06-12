jQuery(document).ready(function ($) {

  var now = moment();
  var $dates = $('.date');
  var $games = $('.game');

  var $navs = $('.nav');
  var $nav = $('#nav');
  var $gotos = $nav.children('.button');
  var $gotoFilters = $('#goto-filters');
  var $gotoAbout = $('#goto-about');
  var $gotoShare = $('#goto-share');
  var $gotoToday = $('#goto-today');

  var $modals = $('.modal');
  var $filters = $('#filters');
  var $about = $('#about');
  var $share = $('#share');
  var $today;

  var $teams = $('.filter-team');
  var $groups = $('.filter-group');

  var teams = [];
  var groups = [];

  // Functions

  function JumpToToday() {
    if ($today) {
      $('html, body').animate({
        scrollTop: $today.offset().top
      }, 1);
    }
  }

  function OpenModal($target, name) {
    $navs.removeClass('is-active');
    $modals.removeClass('is-active');
    $('html').addClass('has-modal-open');
    $target.addClass('is-active');

    if (name === 'filters') {
      $('#filter-controls').addClass('is-active');
    } else {
      $('#modal-controls').addClass('is-active');
    }
  }

  function CloseModals() {
    $navs.removeClass('is-active');
    $nav.addClass('is-active');
    $modals.removeClass('is-active');
    $('html').removeClass('has-modal-open');
  }

  function ApplyFilters() {
    $groups.removeClass('is-active');
    $teams.removeClass('is-active');

    if (teams.length > 0 || groups.length > 0) {
      $games.hide();
      $.each(teams, function(index, value) {
        $filters.find('[data-team="' + value + '"]').addClass('is-active');
        $games.filter('[data-home="' + value + '"]').show();
        $games.filter('[data-away="' + value + '"]').show();
      });
      $.each(groups, function(index, value) {
        $filters.find('[data-group="' + value + '"]').addClass('is-active');
        $games.filter('[data-group="' + value + '"]').show();
      });
    } else {
      $games.show();
    }
  }

  // Init

  $dates.each(function() {
    var $date = $(this);
    var start = moment($date.attr('datetime'));

    if (moment(now).isSame(start, 'day')) {
      $today = $date;
      $date.addClass('is-today');
      JumpToToday();
    }
  });

  $games.each(function() {
    var $game = $(this);
    var start = moment($game.attr('datetime'));
    var end = moment(start).add(105, 'm');
    var $time = $game.children('.time');

    $time.text(moment(start).format('HH:mm'));
    $time.css('visibility', 'visible');

    if (moment(start).isBefore(now)) {
      $game.addClass('is-done');
    } else if (moment(now).isBetween(start, end)) {
      $game.addClass('is-now');
      $time.text('Now');
    }
  });

  // Interaction

  $gotoFilters.click(function() {
    OpenModal($filters, 'filters');
  });

  $gotoAbout.click(function() {
    OpenModal($about, 'about');
  });

  $gotoShare.click(function() {
    OpenModal($share, 'share');
  });

  $('.close-modal').click(function() {
    CloseModals();
  });

  $gotoToday.click(function() {
    JumpToToday();
  });

  $teams.click(function() {
    var team = $(this).data('team');
    var there = $.inArray(team, teams);

    if (there > -1) {
      teams.splice(there, 1);
    } else {
      teams.push(team);
    }

    ApplyFilters();
  });

  $groups.click(function() {
    var group = $(this).data('group');
    var there = $.inArray(group, groups);

    if (there > -1) {
      groups.splice(there, 1);
    } else {
      groups.push(group);
    }

    ApplyFilters();
  });

  $('#reset').click(function() {
    teams = [];
    groups = [];
    ApplyFilters();
  });

});

