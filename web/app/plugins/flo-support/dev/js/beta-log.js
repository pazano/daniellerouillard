class BetaLog {
  constructor() {
    // START: FIREBASE INIT
    	this.appConfig = {
    		apiKey: "AIzaSyAgAlM44YV3aRp5uFYMXw2Pt-3d8I5ZCWE",
    		authDomain: "flosupport-base.firebaseapp.com",
    		databaseURL: "https://flosupport-base.firebaseio.com",
    		projectId: "flosupport-base",
    		storageBucket: "flosupport-base.appspot.com",
    		messagingSenderId: "236985967899"
    	};
      
      this.docsApp;
      
    	// use this to stop connection to firebase (???)
    	// docsApp.delete();

    // END: FIREBASE INIT
  }
  
  load() {
    this.docsApp = firebase.initializeApp(this.appConfig);
  }
  
  // reading is disabled from firebase rules for now
  // readDB(identifier){
	// 	var theDb = firebase.database().ref(identifier + '/');
	// 	theDb.on('value', function(snapshot) {
	// 	  console.log(snapshot.val());
	// 	});
	// }
  
  // write term in firebase
  write(term, termID) {
    
    let pageNow = window.location.pathname;
    
    firebase.database().ref('term_log/' + termID).set({
      term, pageNow
    }, error => {
      if (error) {
        // The write failed...
        console.log(error);
      } else {
        // Data saved successfully!
      }
    });
  }
  
}