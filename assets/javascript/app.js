
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAc9W9W96LsXELOkFy7tvoM2yMfg0i8Qxo",
    authDomain: "train-scheduler-18ffe.firebaseapp.com",
    databaseURL: "https://train-scheduler-18ffe.firebaseio.com",
    projectId: "train-scheduler-18ffe",
    storageBucket: "",
    messagingSenderId: "388590914091"
  };
  firebase.initializeApp(config);



var database = firebase.database();

//Directory
var trainRef = database.ref("/Train Scheduler");

// Create Variables
var name = null;
var destination = null;
var time = null;
var frequency = null;

// Listen for Button Click
$("#user-add-train").on("click", function() {
  event.preventDefault();
  var nameOfTrain = $("#user-input-name").val().trim();
  var Destination = $("#user-input-dest").val().trim();
  var Time = moment($("#user-input-first").val().trim(), "HH:mm").format();
  var Freq = parseInt($("#user-input-freq").val().trim());

  var newTrn = {
    name: nameOfTrain,
    destination: Destination,
    time: Time,
    frequency: Freq
  }

  // Save to Firebase
  database.ref("/Train Scheduler").push(newTrn);

  // Make Input Boxes Blank After Firebase Push
  $("#user-input-name").val(null);
  $("#user-input-dest").val(null);
  $("#user-input-first").val(null);
  $("#user-input-freq").val(null);

});

// Add train to Firebase
database.ref("/Train Scheduler").on("child_added", function( x, y) {


  var nameOfTrain = x.val().name;
  var Destination = x.val().destination;
  var Time = x.val().time;
  var Freq = x.val().frequency;
  var timeConvert = moment(Time, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(timeConvert), "minutes");
  var Remainder = diffTime % Freq;
  var minutesUntil = Freq - Remainder;
  var nextTrain = moment().add(minutesUntil, "minutes");

  // Add train
  $("#sched-for-trains").append("<tr><td>" + nameOfTrain + "</td><td>" + Destination + "</td><td>" + Freq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntil + "</td><td>" + "" + "</td></tr>");

});