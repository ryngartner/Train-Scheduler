// Begin Javascript - Initialize Firebase
$(document).ready(function(){

    

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
          var trainFirst = $("#first-input").val().trim();
          var trainFrequency = $("#frequency-input").val().trim();
        
        // console.log(trainDestination);

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainFirst,
            frequency: trainFrequency
        };

        firebase.database().ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

    });

      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
          console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        var trainFrequency;

        var firstTime = 0;

        var firstTrainConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        var currentTime = moment();
        console.log("current time: " + moment(currentTime).format("HH:mm"));

        var difference = moment().diff(moment(firstTrainConverted), "minutes");
        

        var tRemainder = difference % trainFrequency;
        console.log(tRemainder);

        var minAway = trainFrequency - tRemainder;

        var nextTrain = moment().add(minAway, "minutes");
       

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minAway + "</td></tr>");
 

      });
    });