// Begin Javascript
$(document).ready(function(){

// Initialize Firebase
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

      // Submit Button
      $("#submit-btn").on("click", function(event) {
          event.preventDefault();
      
      //  Users input
          var trainName = $("#train-name-input").val().trim();
          var trainDestination = $("#destination-input").val().trim();
          var trainFirst = $("#first-input").val().trim();
          var trainFrequency = $("#frequency-input").val().trim();
      
      // Object to hold train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainFirst,
            frequency: trainFrequency
        };
      
      // Push train data to firebase
        firebase.database().ref().push(newTrain);

      // Just checking to make sure
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

      // Clearing the input text boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#frequency-input").val("");
    });

      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
          console.log(childSnapshot.val());

        trainName = childSnapshot.val().name;
        trainDestination = childSnapshot.val().destination;
        trainFirst = childSnapshot.val().time;
        trainFrequency = childSnapshot.val().frequency;

        var firstTime = 0;

        var firstTrainConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTrainConverted);

        var currentTime = moment();
        // console.log("Current Time: " + moment(currentTime).format("HH:mm"));

        var difference = moment().diff(moment(firstTrainConverted), "minutes"); 
        // console.log("Difference In Time: " + difference);

        var tRemainder = difference % trainFrequency;
        // console.log(tRemainder);

        var minAway = trainFrequency - tRemainder;
        // console.log("Minutes In Time: " + minAway);

        var nextTrain = moment().add(minAway, "minutes");
        // console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

        $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>"
         + trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minAway + "</td></tr>");
 

      });
    });