$('.ui.dropdown').dropdown();
$('.ui.form').form({
  firstName : {
    identifier : 'firstName',
    rules : [ {
      type : 'empty',
      prompt : 'Please enter your first name'
    } ]
  },
  lastName : {
    identifier : 'lastName',
    rules : [ {
      type : 'empty',
      prompt : 'Please enter your last name'
    } ]
  },
  titleOfOffice : {
    identifier : 'titleOfOffice',
    rules : [ {
      type : 'empty',
      prompt : 'Please select an Office'
    } ]
  },
  email : {
    identifier : 'email',
    rules : [ {
      type : 'contains[@]',
      prompt : 'Your email address must contain an @  - address not valid'
    }, {
      type : 'empty',
      prompt : 'Please enter a valid email'
    } ]
  },
  password : {
    identifier : 'password',
    rules : [ {
      type : 'empty',
      prompt : 'Please enter your password'
    }, {
      type : 'length[6]',
      prompt : 'Your password must be at least 6 characters'
    } ]
  }
});