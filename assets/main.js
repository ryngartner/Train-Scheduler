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

          var trainName = $("#train-name-input").val();
          var trainDestination = $("#destination-input").val();
          var trainFirst = $("#first-input").val();
          var trainFrequency = $("#frequency-input").val();
        
        // console.log(trainDestination);

        database.ref().push({
            name: trainName,
            destination: trainDestination,
            time: trainFirst,
            frequency: trainFrequency
        });
          
             
        });

      database.ref().on("child_added", function(snapshot) {
        //   console.log(snapshot.val());

        var nameT = snapshot.val().name;
        var destinationT = snapshot.val().destination;
        var firstT = snapshot.val().time;
        var frequencyT = snapshot.val().frequency;

        //   console.log(trainFirst + "trainFirst");


        var tStart = firstT;
        var tFrequency = frequencyT;

//First time train from user
        var firstTimeConverted = moment(tStart, "HH:MM").subtract(1, "years");
        console.log(firstTimeConverted + "User Train Time Input");


        


          

          
      });


});
