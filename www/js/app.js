// Ionic Starter App

(function(){
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);


//stateprovider service allows u to create new states
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url:'/list',
    templateUrl: 'templates/list.html'
  });
  $stateProvider.state('edit', {
    url:'/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });
  $stateProvider.state('add', {
    url:'/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });
//using same template for ADD and EDIT functions, 
//so that's why we set controller here

  $urlRouterProvider.otherwise('/list');
});
//the last line says if url doesn't match anything, go to '/list'


 var notes = [
    {
      id: "1",
      title: 'First Note',
      description: "This is my first note"
    }, {
      id: "2",
      title: 'Second Note',
      description: "This is my second note"
    }
    ];


app.controller("ListCtrl", function($scope){
  $scope.notes = notes;
//now just refers to the notes variable that is outside
});



//created this function outside of controllers to help us get the note per the noteID
//that is needed in edit controller
function getNote(noteId) {
  for (var i=0; i<notes.length; i++) {
    if (notes[i].id===noteId) {
      return notes[i];
    }
  }
  return undefined;
}

function updateNote(note) {
  for (var i=0; i<notes.length; i++) {
    if (notes[i].id===note.id) {
      notes[i] = note;
      //in line above, we replace the note with our modified note
      return;
    }
  }
}

function createNote(note) {
  notes.push(note);
}

//****** $state - will let us access the parameter we get from the URL 
//here it is the id of the note
app.controller('EditCtrl', function($scope, $state){
  //$scope.noteId = $state.params.noteId;
  //this will set a variable on scope with our noteID
  
  //this is to have a note object on the scope
  //$scope.note = getNote($state.params.noteId);
//right now the notes array is automatically being updated since there is no save button
//if you want a save button..you can make a copy of hte object so any changes will be avail
//in copy, and not affecting the listCtrl notes view, till we save

  $scope.note = angular.copy(getNote($state.params.noteId));

  $scope.save = function(){
    updateNote($scope.note);
    //after we update the note, we need to go back to list view,
    //we can use state service to navigate back
    $state.go('list');

  };
});


app.controller('AddCtrl', function($scope, $state){

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description:''
  };

  //using the Date as id since we want a unique value here

  $scope.save = function(){
    createNote($scope.note);
    //after we update the note, we need to go back to list view,
    //we can use state service to navigate back
    $state.go('list');

  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


})();

//wrapping everything in function. want the data from the $scope.notes (previously was just 
  //located in listCtrl, to be available to other controllers. you can place it outside the 
  //list Ctrl, but dont want it to be hanging out in the global scope, so wrap everything
  //in an anonymous function
