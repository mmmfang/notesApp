angular.module('mynotes.notestore', [])

	//creating a service for data that needs to be shared amongst more than one 
//controller, like all this notes. the factory's job is to return a service
.factory('NoteStore', function(){
  
  //var notes = [];
  //when initializing we want to read notes from local storage
  //but it will be in json format so we switch it back
  var notes = angular.fromJson(window.localStorage['notes'] || '[]');
  //this or is incase nothing in localstorage, then first use this empty array
  //as a string so it will be converted into an array object by fromJson function


//we want to persist notes in local storage as json
//and we need to call it each time we want to save - create or edit
function persist() {
	//window.localStorage['notes'] = notes
	//convert to
	window.localStorage['notes'] = angular.toJson(notes);
}

  return {
    list: function(){
      return notes;
    },

    get:function(noteId){
      for (var i=0; i<notes.length; i++) {
        if (notes[i].id===noteId) {
          return notes[i];
        }
      }
      return undefined;
    },

    create: function(note){
        notes.push(note);
        persist();
    },

    update: function(note) {
      for (var i=0; i<notes.length; i++) {
        if (notes[i].id===note.id) {
          notes[i] = note;
          //in line above, we replace the note with our modified note
          persist();
          return;
        }
      }
    },

    remove: function(noteId) {
      for (var i=0; i<notes.length; i++) {
        if (notes[i].id===noteId) {
          notes.splice(i, 1);
          persist();
          return;
    	}
  	  } 
	}
}
});

//first created the getNote, updateNote and createNote functions outside of controllers to 
//help us get the note per the noteID that is needed in edit controller. But after creating
//a factory, we moved these functions into the NoteStore service
