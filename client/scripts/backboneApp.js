var isInvalid = function (username, message) {
    return  !username || !message || !!username.match(/[^\w\s]/) || !!message.match(/[^\w\s]/);
}

var Message = Backbone.Model.extend({
  initialize: function(username, message) {
    this.set({
      username: username,
      message: message
    });
  }
});

var MessageView = Backbone.View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  render: function () {
    var template = [
      "<span class='username'>",
        this.model.get('username'),
      "</span> : <span class='message'>",
        this.model.get('message'),
      "</span>"
    ].join('');
    return this.$el.html(template);
  }
})

var m = new Message('hello', 'world');
var v = new MessageView({ model: m});
m.set('message', 'foofoo');


var Messages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function (data) {
    console.log(data);
    var results = data.results;
    results.forEach(function (message, index) {
      if(isInvalid(message.username, message.text)) {
        return;
      }
      
      var m = new Message(message.username, message.text);
      var v = new MessageView({ model: m });
      $('#chats').prepend(v.render());

      if(index === results.length-1) {
        lastMessageReceived = message.createdAt;

      }
    });
  },
  model: Message
});

var messages = new Messages();

messages.fetch();

setInterval(function () {
  messages.fetch();
}, 1000);


// var mostRecentMessage;

// var app = {
//   server: 'https://api.parse.com/1/classes/chatterbox',
//   init: function() {
 


//     $(document).on('ready', function () {

//       $(".submit").on("click", function() {
//         app.handleSubmit();
//       });

//       $("#chats").on("click", ".username", function() {
//         app.addFriend(this);
//       });

//       // fetch messages, and re-fetch every 1 second
//       app.fetch();
//       setInterval(app.fetch, 1000);
//     });


//   }, // end init function //


//   send: function (message) {
//       var valid = !isInvalid(message.username, message.text);
//       if(valid) {
//         $.ajax({
//           // always use this url
//           url: app.server,
//           type: 'POST',
//           data: JSON.stringify(message),
//           contentType: 'application/json',
//           success: function (data) {
//             console.log('chatterbox: Message sent');
//             $(".message").val("");
//             $(".message").focus();
//           },
//           error: function (data) {
//             // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//             console.error('chatterbox: Failed to send message');
//           }
//         });
//       } else {
//         alert('BAD! DON\'T YOU BE BAD!');
//       }



//   }, // end send function //
//   fetch: function(timestamp) {


//       console.log('refreshed');
//       $.ajax({
//         url:"https://api.parse.com/1/classes/chatterbox",
//         type:'GET',
//         data: {
//           "where": {
//             "createdAt": {
//               "$gt" : mostRecentMessage
//             }
//           }
//         },
//         contentType: 'application/json',
//         success:function(data) {
//           console.log(data);
//           var results = data.results;
//           for(var i=results.length-1; i > -1; i--) {
//             var message = {
//               username: results[i].username,
//               text: results[i].text
//             };
//             app.addMessage(message);
//           }
//           if(results.length > 0) {
//             mostRecentMessage = results[0].createdAt;
//           }
//         }
//       });



//     }, // end fetch function //
//     clearMessages: function () {


//       $('#chats').children().remove();


//     },
//     addMessage: function(message) {


//       var valid = !isInvalid(message.username, message.text);
//       if(valid) {
//         var node = $('<div></div>');
//         node.html("<span class='username'>" + message.username + "</span>" + ' : ' + "<span class='message'>" + message.text + "</span>");
//         $('#chats').prepend(node);
//       } else {
//         console.log('BAD!: ' + message.username + ' ' + message.text);
//       }



//     },
//     addRoom: function (lobbyName) {


//       var node = $("<li>" + lobbyName + "</li>");
//       $('#roomSelect').append(node);


//     },
//     addFriend: function(node) {


//       $(node).css({
//         "font-weight":"bold"
//       })


//     },
//     handleSubmit: function() {


//       var message = {
//         'username': $(".name").val(),
//         'text': $(".message").val(),
//         'roomname': '4chan'
//       };
//       app.send(message);


//     }
// }  // end app

// app.init();


































