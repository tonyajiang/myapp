// FirebaseUI config.
var uiConfig = {
  callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            var app = firebase.app();
            // var user = app.database().ref('users/' + firebase.auth().currentUser.uid);
            var user = app.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot){
              console.log(snapshot.val());
              if(snapshot.val() == null){
                window.location.assign('#/page8');
                return false;
              }
            });
            return true;
          }
        },
  signInSuccessUrl: '#/page1/page4',
  // Query parameter name for mode.
  queryParameterForWidgetMode: 'mode',
  // Query parameter name for sign in success url.
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.

ui.start('#firebaseui', uiConfig);

ui.disableAutoSignIn();
