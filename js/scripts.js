// Back-end logic:

function DestinationList() {
  this.destinations = [];
  this.currentId = 0;
}

DestinationList.prototype.addDestination = function(destination) {
  destination.id = this.assignId();
  this.destinations.push(destination);
}

DestinationList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

DestinationList.prototype.findDestination = function(id) {
  for (var i=0; i< this.destinations.length; i++) {
    if (this.destinations[i]) {
      if (this.destinations[i].id == id) {
        return this.destinations[i];
      }
    }
  };
  return false;
}

function Destination(name, city, state, landmarks, seasons, notes) {
  this.name = name;
  this.city = city;
  this.state = state; 
  this.landmarks = landmarks;
  this.seasons = seasons; 
  this.notes = notes;
}

// Front-end logic:
var destinationList =  new DestinationList();

function displayDestinationDetails(destinationListToDisplay) {
  var list= $("ul#destinations");
  var details = "";
  destinationListToDisplay.destinations.forEach(function(listItem) {
    details += "<li id=" + listItem.id + ">" + listItem.name + "</li>";
  });
  list.html(details);
}

function showDetails(destinationId) {
  var clickedDestination = destinationList.findDestination(destinationId);
  console.log(destinationId);
  console.log(clickedDestination);
  $("#show-details").show();
  $(".name").html(clickedDestination.name);
  console.log(clickedDestination.name);
  $(".city").html(clickedDestination.city);
  $(".state").html(clickedDestination.state);
  $(".landmarks").html(clickedDestination.landmarks);
  $(".seasons").html(clickedDestination.seasons);
  $(".notes").html(clickedDestination.notes);
}

function attachClickListeners() {
  $("ul#destinations").on("click", "li", function() {
    showDetails(this.id);
  });
};

$(document).ready(function() {
  attachClickListeners();
  $("form").submit(function(event) {
    event.preventDefault();

    var name = $("input#name").val();
    var city = $("input#city").val();
    var state = $("input#state").val();
    var landmarks = $("input#landmarks").val().split(",");
    var seasons = $("input#seasons").val().split(",");
    var notes = $("input#notes").val();

    var newDestination = new Destination(name, city, state, landmarks, seasons, notes);

    console.log(newDestination);
    destinationList.addDestination(newDestination);
    console.log(destinationList);
    displayDestinationDetails(destinationList);

  });
});