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

//console.log(profileTemplate);
$("#summoner").on('click.summon', function(){
  // Now we do it with AJAX (needs to be served)
  $.ajax({
    url: '//api.github.com/users/jmsherry' //you can change your username for mine
    }).done(function(result){
      console.log(result);
      var newHtml = profileTemplate(result);
      //console.log(newHtml);
      $('#ajax-content').html(newHtml);
    })
    .fail(function(err){
      console.error(err);
    });
  });
  //BECAUSE ajax is asynchronous, anything you put down here will happen before the request is completed, and hence it's no use
});
