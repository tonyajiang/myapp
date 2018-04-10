angular.module('app.controllers', [])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('welcomeCtrl', function($scope, $state) {})

  .controller('myCarCtrl', function($scope, $state, $firebaseObject, $firebaseArray) {
    $scope.openChat = function() {
      $state.go('chat');
    };
    var curr = JSON.parse(document.getElementById('account-details').textContent);
    firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
      var carId = snapshot.val().currentCar;
      var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + carId + "/users");
      $scope.users = $firebaseArray(car_firebase);
    });

    $scope.$on('$locationChangeStart', function(event) {
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
        var carId = snapshot.val().currentCar;
        var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + carId + "/users");
        $scope.users = $firebaseArray(car_firebase);
      });
    });
  })

  .controller("availableCtrl", function($scope, Items, $state, $stateParams, Users, $firebaseObject, $firebaseArray) {
    var playersRef = new Firebase("https://test-7422a.firebaseio.com/").child("cars");
    var query = playersRef.orderByChild("active").equalTo(true).limitToLast(10);
    var list = $firebaseArray(query);

    $scope.$on('$locationChangeStart', function(event) {
      Items.forEach(function(entry) {
        var curr = new Date();
        var timestamp = new Date(entry.timestamp);
        var leaving_time_compare = new Date(curr.toLocaleDateString() + " " + entry.when);
        var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + entry.$id);
        if (leaving_time_compare > timestamp) { // same day
          if (curr > leaving_time_compare) {
            car_firebase.update({ 'active': false });
            // // TODO: remove the currentCar from all users in this car thats active???
            // but the car could still exist?
            // // TODO: should you be able to create a car if you're in a car?
          }
        } else { // tomorrow
          var today = new Date();
          curr.setDate(curr.getDate() - 1);
          if (curr.toLocaleDateString() == timestamp.toLocaleDateString()) { // is it tomorrow yet?
            if (today > leaving_time_compare) {
              car_firebase.update({ 'active': false });
            }
          }
        }
      });
    });

    $scope.items = list;
    // $scope.items = Items;
    $scope.new = {};
    $scope.params = $stateParams;

    $scope.addItem = function() {
      console.log($scope.new);
      if (Object.keys($scope.new).length != 0) {
        var time = new Date($scope.new.when);
        time = time.format("shortTime");

        var date = new Date();
        var timestamp = date.toLocaleString();

        var curr = JSON.parse(document.getElementById('account-details').textContent);
        var ref = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
        var user = $firebaseObject(ref);

        var name = user.name;
        var venmo = user.venmo;
        var phone = user.phone;
        var school = user.school;
        var desc = user.desc;
        var year = user.year;

        $scope.items.$add({
          "when": time,
          "from": $scope.new.from,
          "to": $scope.new.to,
          "active": true,
          "timestamp": timestamp,
          "users": {

          }
        }).then(function(ref) {
          var id = ref.key();
          var curr = JSON.parse(document.getElementById('account-details').textContent);
          var car_ref = new Firebase("https://test-7422a.firebaseio.com/cars/" + id + "/users/" + curr.uid);
          var curr_user_ref = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
          var user = $firebaseObject(curr_user_ref);
          var users = $firebaseObject(car_ref);
          firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
            var user = snapshot.val();
            users.name = user.name;
            users.venmo = user.venmo;
            users.phone = user.phone;
            users.school = user.school;
            users.desc = user.desc;
            users.year = user.year;
            users.img = "img/1.png",
              users.$save().then(function() {
                console.log(user);
              });

          });
        });
        $state.go('tabsController.available');
      } else {
        alert("Please fill out the form.");
      }
    };

    $scope.goToState = function(info) {
      $scope.id = info["$id"];
      $state.go('tabsController.example', { info });
    }
  })

  .controller('createCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('exampleCtrl', function($scope, $stateParams, Users, $state, $firebaseObject) {
    $scope.params = $stateParams;
    $scope.users = Users.get($scope.params["info"]["$id"]);
    $scope.showJoin = true;
    // show or hide button
    firebase.database().ref('cars/' + $scope.params["info"]["$id"] + '/users').once('value').then(function(snapshot) {
      var numPeople = snapshot.numChildren();
      $scope.showLeave = false;
      if (numPeople < 3) {
        $scope.showJoin = true;
        $scope.showLeave = false;
      } else {
        $scope.showJoin = false;
        $scope.showLeave = false;
      }
      var user = snapshot.val();
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      for (var key in user) {
        if (key == curr.uid) {
          $scope.showJoin = false;
          $scope.showLeave = true;
        }
      }
    });

    $scope.openChat = function() {
      $state.go('chat');
    };

    $scope.join = function() {
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      var user = null;
      firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
        user = snapshot.val();
      }).then(function() {
        var car_ref = new Firebase("https://test-7422a.firebaseio.com/cars/" + $scope.params["info"]["$id"] + "/users/" + curr.uid);
        var addUser = $firebaseObject(car_ref);
        addUser.name = user.name;
        addUser.venmo = user.venmo;
        addUser.phone = user.phone;
        addUser.school = user.school;
        addUser.desc = user.desc;
        addUser.year = user.year;
        addUser.img = "img/1.png",
          addUser.$save().then(function() {
            $scope.showJoin = false;
            $scope.showLeave = true;
          });

        var user_firebase = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
        user_firebase.update({ 'currentCar': $scope.params["info"]["$id"] });

        firebase.database().ref('cars/' + $scope.params["info"]["$id"] + '/users').once('value').then(function(snapshot) {
          var numPeople = snapshot.numChildren();

          if (numPeople >= 3) {
            var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + entry.$id);
            car_firebase.update({ 'active': false });
          }
        });
      });
    }

    $scope.leave = function() {
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      var car_ref = new Firebase("https://test-7422a.firebaseio.com/cars/" + $scope.params["info"]["$id"] + "/users/" + curr.uid);
      var car = $firebaseObject(car_ref);
      car.$remove().then(function(ref) {
        $scope.showLeave = false;
        $scope.showJoin = true;
      });

      var user_firebase = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid + "/currentCar");
      var user_obj = $firebaseObject(user_firebase);
      user_obj.$remove();
    }
  })

  .controller('loginCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $ionicSideMenuDelegate) {
      $ionicSideMenuDelegate.canDragContent(false);
    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('createProfileCtrl', ['$state', '$scope', '$stateParams', 'Profiles', '$firebaseObject', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($state, $scope, $stateParams, Profiles, $firebaseObject) {
      $scope.profiles = Profiles;
      $scope.new_profile = {};

      $scope.addProfile = function() {
        if (Object.keys($scope.new_profile).length != 0) {
          var curr = JSON.parse(document.getElementById('account-details').textContent);
          var ref = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
          var user = $firebaseObject(ref);
          user.name = $scope.new_profile.name;
          user.venmo = $scope.new_profile.venmo;
          user.phone = $scope.new_profile.phone,
            user.school = $scope.new_profile.school,
            user.desc = $scope.new_profile.desc,
            user.year = $scope.new_profile.year,
            user.img = null,
            user.$save().then(function() {
              $state.go('tabsController.available');
            });
        } else {
          alert("Please fill out the form.");
        }
      };
    }
  ])

  .controller('editCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  // .controller('chatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  //   // You can include any angular dependencies as parameters for this function
  //   // TIP: Access Route Parameters for your page via $stateParams.parameterName
  //   function($scope, $stateParams, $state, $firebaseObject, $firebaseArray) {
  //     $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
  //       viewData.enableBack = true;
  //     });
  //     var curr = JSON.parse(document.getElementById('account-details').textContent);
  //     firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
  //       var carId = snapshot.val().currentCar;
  //       var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + carId + "/users");
  //       $scope.users = $firebaseArray(car_firebase);
  //     });

  //     $scope.$on('$locationChangeStart', function(event) {
  //       var curr = JSON.parse(document.getElementById('account-details').textContent);
  //       firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
  //         var carId = snapshot.val().currentCar;
  //         var car_firebase = new Firebase("https://test-7422a.firebaseio.com/cars/" + carId + "/users");
  //         $scope.users = $firebaseArray(car_firebase);
  //       });
  //     });
  //   }
  // ])
  .controller('chatCtrl', function($scope, $state, $firebaseObject, $firebaseArray) {
    $scope.openChat = function() {
      $state.go('chat');
    };
    var curr = JSON.parse(document.getElementById('account-details').textContent);
    firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
      var carId = snapshot.val().currentCar;
      var chat_firebase = new Firebase("https://test-7422a.firebaseio.com/chats/" + carId);
      $scope.chats = $firebaseArray(chat_firebase);
    });

    $scope.$on('$locationChangeStart', function(event) {
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      firebase.database().ref('users/' + curr.uid).once('value').then(function(snapshot) {
        var carId = snapshot.val().currentCar;
        var chat_firebase = new Firebase("https://test-7422a.firebaseio.com/chats/" + carId);
        $scope.chats = $firebaseArray(chat_firebase);
      });
    });
  })
