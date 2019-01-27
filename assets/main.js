// Begin Javascript - Firebase

$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyDqoQTWcOsQzKCR2rzuOeTiivWUAZtW_yE",
        authDomain: "train-scheduler-23d8a.firebaseapp.com",
        databaseURL: "https://train-scheduler-23d8a.firebaseio.com",
        projectId: "train-scheduler-23d8a",
        storageBucket: "",
        messagingSenderId: "421918923570"
      };
      firebase.initializeApp(config)

      var database = firebase.database();

      // Button for adding Trains
      $("#add-train-btn").on("click", function(event) {
          event.preventDefault();

          var trainName = $("#train-name-input").val().trim();
          var trainDestination = $("#destination-input").val().trim();
          var trainFirst = moment($("#first-input").val().trim(), "HH:MM").format("X");
          var trainFrequency = $("#frequency-input").val().trim();


          var newTrain = {
              train: trainName,
              destination: trainDestination,
              first: trainFirst,
              frequency: trainFrequency
          }
      });


});
