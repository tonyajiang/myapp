// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://test-7422a.firebaseio.com/cars");
  return $firebaseArray(itemsRef);
})

.controller("ListCtrl", function($scope, Items, $state) {
  $scope.items = Items;
  $scope.new = {};

  $scope.addItem = function() {
    console.log($scope.new);
    if(Object.keys($scope.new).length != 0){
      var time = new Date($scope.new.when);
      time = time.format("shortTime");
        $scope.items.$add({
          "when": time,
          "from": $scope.new.from,
          "to":   $scope.new.to
        });
        $state.go('tabsController.available');
    } else{
      alert("Please fill out the form.");
    }
  };
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});


//


/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
function getWidgetUrl() {
  return '/widget#recaptcha=' + getRecaptchaMode();
}

var signInWithRedirect = function() {
  window.location.assign(getWidgetUrl());
};

var initApp = function() {
  document.getElementById('menuCtrl').style.visibility = "hidden";
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
             // document.getElementById('sign-in-status').textContent = 'Signed in';
             // document.getElementById('sign-in').textContent = 'Sign out';
             // document.getElementById('account-details').textContent = JSON.stringify({
             //   displayName: displayName,
             //   email: email,
             //   emailVerified: emailVerified,
             //   phoneNumber: phoneNumber,
             //   photoURL: photoURL,
             //   uid: uid,
             //   accessToken: accessToken,
             //   providerData: providerData
             // }, null, '  ');
           });
         } else {
           // User is signed out.
           // document.getElementById('sign-in-status').textContent = 'Signed out';
           document.getElementById('menuCtrl').style.visibility = "hidden";
           // document.getElementById('account-details').textContent = 'null';
         }
       });
};


window.addEventListener('load', initApp);
