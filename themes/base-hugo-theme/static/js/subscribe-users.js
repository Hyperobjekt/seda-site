(function($) {
  var jQuery = $.noConflict(false);
  var $ = jQuery;
  /**
   * Calls a lambda function which subscribes the user
   * to mailchimp lists.
   */
  if ($('form#getTheData').length >= 1) {
    console.log('Testing subscribe-users.js at ' + subscribePath);
    const $submit = $('#mc-embedded-subscribe');
    $('#mc-embedded-subscribe').on('click', function(e) {
      // console.log('Submit clicked.');
      e.preventDefault();
      // If honeyput input not filled, make request.
      const honeypot = $('form#getTheData input.botField').val();
      const email = $('form#getTheData input#email-field').val();
      const $spinner = $('form#getTheData #mcSpinner');
      if (!honeypot && String(email).length >= 1) {
        console.log('Making AJAX call.');
        // Set spinner spinnings
        $spinner.css({'opacity': 1});
        // Set submit form to inactive
        $submit.prop( "disabled", true );
        // Make ajax call.
        $.ajax({
          method: "POST",
          url: subscribePath + "/subscribe-users/",
          dataType: 'json',
          timeout: 4000,
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          data: JSON.stringify({
            'status': 'subscribed',
            'email': email
          }),
          success: function(result) {
            console.log('AJAX request success!!!!');
            // console.log(result);
            // Stop spinner spinning.
            $spinner.css({'opacity': 0});
            // Redirect.
            const timeout = setTimeout(function() {
              window.location = result.redirect;
            }, 600);
          },
          error: function(result) {
            console.error('Something went wrong. Here\'s some information:\n\n' + result.responseJSON.title + ' \n' + result.responseJSON.detail);
            // Stop spinner spinning.
            $spinner.css({'opacity': 0});
            // Set form input to active.
            $submit.prop("disabled", false);
            // What do we do if the user already exists?
          }
        });
      } else {
        console.error("😲 Uh oh, there's a bot on the page, or the email input isn't filled! Please try again.");
      }
    });
  }
})(jQuery);
