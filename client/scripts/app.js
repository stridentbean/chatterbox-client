
// Server:
// https://api.parse.com/1/classes/chatterbox

// var mostRecentMessage = 0;  //time in millis
var mostRecentMessage;
// Display messages retrieved from the parse server

var appendMessage = function(username, message) {
  var bad = function() {

    return  !username || !message || !!username.match(/[^\w\s]/) || !!message.match(/[^\w\s]/);
  };

  if(bad()) {
    return;
  }
  var node = $('<div></div>');
  node.text(username + ' : ' + message);
  $('#main').append(node);
}

// make ajax call
var refreshMessages = function(timestamp) {
  console.log('refreshed');
  $.ajax({
    url:"https://api.parse.com/1/classes/chatterbox",
    type:'GET',
    data: {
      "where": {
        "createdAt": {
          "$gt" : mostRecentMessage
        }
      }
    },
    contentType: 'application/json',
    success:function(data) {
      debugger
      console.log(data);
      var results = data.results;

      // return messages
      // display messages
      for(var i=0; i < results.length; i++) {
        appendMessage(results[i].username, results[i].text);
        // store last timestamp
        // query by timestamp
      }
      //mostRecentMessage = new Date(results[results.length-1].createdAt).getTime();
      if(results.length > 0) {
        mostRecentMessage = results[results.length-1].createdAt;
      }
    }
  });
}

refreshMessages();

// Setup a way to refresh the displayed messages (either automatically or with a button)

// setInterval call
setInterval(refreshMessages, 1000);
  // re-call messages endpoint
  // update page with messages


// Allow users to select a username

// make user object
  // name : set name from input
  // validate no XSS


// Allow users to send messages

// if the user name is not set
  // throw error
// else
  // validate message for XSS
  // if valid
    // make POST call to parse
  // else
    // throw an error



/////////////////// NOTE
// Be careful to use proper escaping on any user input.
// Since you're displaying input that other users have typed, your app is vulnerable XSS attacks.
// Note: If you issue an XSS attack, make it innocuous enough to be educational, rather than disruptive.



////////////////////// Rooms ////////////////////////////

// Allow users to create rooms and enter existing rooms
// //(rooms are defined by the message.room property of messages, so you'll need to filter them somehow)






/////////////////// Socializing  ////////////////////////////

// Allow users to 'befriend' other users by clicking on their username
// Display all messages sent by friends in bold

