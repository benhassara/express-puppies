// DOM manip

$(document).on('ready', function() {
  // refactor: move these to CSS
  $('#success-msg').hide();
  $('#error-msg').hide();

  getPuppies();
});

$('form').on('submit', function(event) {
    event.preventDefault();
    // grab form values

    var $puppyName = $('#name');
    var $puppyAge = $('#age');
    var $puppyID = $('#id');

    // send to server with AJAX
    $.ajax({
      url: '/api/v1/puppies',
      method: 'POST',
      data: {
        puppyID: $puppyID.val(),
        puppyName: $puppyName.val(),
        puppyAge: $puppyAge.val()
      },
    })
    .done(function(data) {
      // render something to DOM
      $puppyID.val('');
      $puppyName.val('');
      $puppyAge.val('');

      $('#error-msg').hide();
      $('#success-msg')
          .html(data.message)
          .show();
      $('#results').html('');
      getPuppies();
    })
    .fail(function(jqXHR) {
      $('#success-msg').hide();
      $('#error-msg')
          .html(jqXHR.responseJSON.error)
          .show();
    });
});

// utilities

function getPuppies() {

  $.ajax({
    method: 'GET',
    url: '/api/v1/puppies'
  })
  .done(function(data) {
    data.forEach(function(pup){
      $('#results').prepend(
        '<p><a href="puppy/' + pup.puppyID + '">' + pup.puppyName + '</a></p>');
    });
  });
  // .fail(function(err) {
  //   console.log(err);
  // });
}
