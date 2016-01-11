angular.module('mynotes.notestore', [])

	//creating a service for data that needs to be shared amongst more than one 
//controller, like all this notes. the factory's job is to return a service
.factory('NoteStore', function(){
  var notes = [];

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
    },

    update: function(note) {
      for (var i=0; i<notes.length; i++) {
        if (notes[i].id===note.id) {
          notes[i] = note;
          //in line above, we replace the note with our modified note
          return;
        }
      }
    }
  }; 
});

//first created the getNote, updateNote and createNote functions outside of controllers to 
//help us get the note per the noteID that is needed in edit controller. But after creating
//a factory, we moved these functions into the NoteStore service
