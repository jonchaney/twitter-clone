const FollowToggle = require('./follow_toggle.js');

$(() => {
  const $el = $('.follow-toggle');
  $el.each (function( index, element ) {
    new FollowToggle($(element));
  });
});
