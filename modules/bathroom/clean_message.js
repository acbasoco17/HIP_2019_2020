Module.register("clean_message", {
  defaults: {
    message: "Posted";
  },
  getDom: function() {
    (function () {
      var firebase = require("firebase");
      const config = {
        apiKey: "AIzaSyCBYsN7VD4yYAQy-6lK5ug1GLZE63uZxyo",
        authDomain: "magic-mirror-305401.firebaseapp.com",
        databaseURL: "https://magic-mirror-305401-default-rtdb.firebaseio.com",
        projectId: "magic-mirror-305401",
        storageBucket: "magic-mirror-305401.appspot.com",
        messagingSenderId: "128949355841",
        appId: "1:128949355841:web:0ed3a49f49595815664dc0",
        measurementId: "G-NEBVFJQNL4"
      };
      firebase.initializeApp(config);
      var last;
      var dbRefObject = firebase.database().ref().child("Log");
      dbRefObject.once("child_added").then(function(snapshot){
        var date = snapshot.child("Date").val()
        var time = snapshot.child("Time").val()
        var name = snapshot.child("User").val()

        var message = "This bathroom was last cleaned on " + date + " at " + time + " by " + name + ".";
        var wrapper = document.createElement("div");
        wrapper.innerHTML =this.config.message;
        return wrapper
      });
    }());
  }
});
