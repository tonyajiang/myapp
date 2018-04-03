/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
var signInWithRedirect = function() {
  window.location.assign(getWidgetUrl());
};

var initApp = function() {
  document.getElementById('menu-list-item15').addEventListener('click', function() {
    firebase.auth().signOut();
 });

 firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           document.getElementById('menuCtrl').style.visibility = "visible";
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var uid = user.uid;
           var phoneNumber = user.phoneNumber;
           var providerData = user.providerData;
           user.getIdToken().then(function(accessToken) {
             document.getElementById('sign-in-status').textContent = 'Signed in';
             document.getElementById('account-details').textContent = JSON.stringify({
               displayName: displayName,
               email: email,
               emailVerified: emailVerified,
               phoneNumber: phoneNumber,
               photoURL: photoURL,
               uid: uid,
               accessToken: accessToken,
               providerData: providerData
             }, null, '  ');
           });
         } else {
           // User is signed out.
           firebase.auth().signOut();
           window.location = "/#/page6";
           document.getElementById('sign-in-status').textContent = 'Signed out';
           document.getElementById('account-details').textContent = 'null';
         }
       });
};


window.addEventListener('load', initApp);
