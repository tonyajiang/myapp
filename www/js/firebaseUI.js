// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '#/page1/page4',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Terms of service url.
  tosUrl: '<your-tos-url>'

};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.

ui.start('#firebaseui', uiConfig);

ui.disableAutoSignIn();
console.log("here");
