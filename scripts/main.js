$(function(){

  // TEMPLATING
  // Find template and compile into a function
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source); //returns a function

  // Output HTML by executing that function and passing it the values (context)
  var context = {body: "This is templated content!"};
  var html    = template(context);

$("#inserter").on('click.insert', function(){
  $('#templated-content').append(html);
});




var profileSource   = $("#profile-template").html();
var profileTemplate = Handlebars.compile(profileSource); //returns a function

var defaultUser = 'jmsherry';
var currentUser = defaultUser;
var $userDisplay = $('#currentUser');
$userDisplay.text(defaultUser);

var notFound = 'User Not Found';

//console.log(profileTemplate);
$("#gh-user-form").on('submit.findGHUser', function(){
  // Now we do it with AJAX (needs to be served)
  var selectedUser = $('#username').val();

  if(selectedUser){
    currentUser = selectedUser;
    $userDisplay.text(currentUser);
  }
  $.ajax({
    url: '//api.github.com/users/' + currentUser //you can change your username for mine
    }).done(function(result){
      console.log(result);
      var newHtml = profileTemplate(result);
      //console.log(newHtml);
      $('#ajax-content').html(newHtml);
    })
    .fail(function(err){
      if(err.status===404){
        $('#ajax-content').html(notFound);
        console.info(notFound);
      } else {
        console.error(err);
      }
    });
    return false;
  });
  //BECAUSE ajax is asynchronous, anything you put down here will happen before the request is completed, and hence it's no use

  //PRECOMPILED TEMPLATE USE
  var precomp1Html = Handlebars.templates['test.hbs']({message: "I'm template 1"});
  var precomp2Html = Handlebars.templates['test2.hbs']({
    text: "I\'m template 2",
    text2: "I'm template 2 too!"
  })
  $('#compiled-receiver').append(precomp1Html).append(precomp2Html);
});
