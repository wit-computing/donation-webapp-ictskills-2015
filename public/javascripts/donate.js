$('.ui.checkbox').checkbox();
$('.ui.dropdown').dropdown();

// At page load initially set progress % to 0%
$('#progresslabel').text("0% of target achieved to date for candidate ");
$('.ui.indicating.progress').progress({
  percent : "0%"
});

// div container for AJAX response completely disappears on page load
$('#notificationBox').hide();

/**
 * this was necessary when I implemented AJAX as message appears when you
 * previously had a successful donation.
 * You want this message to disappear when you are entering another donation.
 * Also hide the div container #notificationbox.
 * Also hide #target - user may have gotten a warning that their donation would
 * be over target but they may then decide to enter a smaller donation so
 * hide #target
 */
$('.ui.form').click(function() {
  $('#notification').html("");
  $('#notificationBox').hide("slow");
  $('#target').hide();
});

$('.ui.form').form({

  candidateEmail : {
    identifier : 'candidateEmail',
    rules : [ {
      type : 'empty',
      prompt : 'Please select a Candidate to whom you wish to make a donation'
    } ]
  },
  amountDonated : {
    identifier : 'amountDonated',
    rules : [ {
      type : 'empty',
      prompt : 'Please select an amount to donate'
    } ]
  }
},

{
  onSuccess : function() {
    submitForm();
    return false;
  }
});

/**
 * AJAX to send progress bar percent, candidate name + whether donation was
 * successful to html
 */
function submitForm() {
  var formData = $('.ui.form.segment input').serialize();
  $.ajax({
    type : 'POST',
    url : '/donation/donate',
    data : formData,
    success : function(response) {
      console.log("make donation page submitForm response: "
          + response.progress);
      if ($('#target').length) // If label present detach it
      {
        $('#target').detach();
      }

      if (response.progress === '100%') // Attach label if 100% target reached
      {
        $('#targetReached').append(
            '<div id="target" class="ui red label">Target reached</div>');
      }

      /**
       * couldn't have changed the colour attribute below in the response = 100% check
       * statement as also want to give a warning if we are not at 100% of the target yet
       * but accepting the donation would push us over 100% so in that case progress is not
       * 100% BEFORE the donation 
       */
      if (response.colorattrb === 'warning') {
        $('#notification').css('color', 'red');
      } else {
        $('#notification').css('color', 'black');
      }

      // output whether donation successful or can't be accepted      
      $('#notification').html(response.accepted);
      $('#notificationBox').show("fast");

      $('.ui.indicating.progress').progress({
        percent : response.progress
      });
      $('#progresslabel').text(
          response.progress + " of target achieved to date for candidate "
              + response.fullName);
    }
  });
}
