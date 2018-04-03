
angular.module('app.controllers', [])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('welcomeCtrl', function($scope, $state) {
  })

  .controller("ListCtrl", function($scope, Items, $state, $stateParams, Users, $firebaseObject) {
    $scope.items = Items;
    $scope.new = {};
    $scope.params = $stateParams;

    $scope.addItem = function() {
      console.log($scope.new);
      if(Object.keys($scope.new).length != 0){
        var time = new Date($scope.new.when);
        time = time.format("shortTime");

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
          "to":   $scope.new.to,
          "users": {

          }
       }).then(function(ref) {
          var id = ref.key();
          var curr = JSON.parse(document.getElementById('account-details').textContent);
          var car_ref = new Firebase("https://test-7422a.firebaseio.com/cars/" + id + "/users/" +curr.uid);
          var curr_user_ref = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
          var user = $firebaseObject(curr_user_ref);
          var users = $firebaseObject(car_ref);
          firebase.database().ref('users/'+ curr.uid).once('value').then(function(snapshot) {
                  var user = snapshot.val();
                  users.name = user.name;
                  users.venmo = user.venmo;
                  users.phone = user.phone;
                  users.school = user.school;
                  users.desc = user.desc;
                  users.year = user.year;
                  users.img = "img/1.png",
                  users.$save().then(function () {
                      console.log(user);
                  });

          });
        });
       $state.go('tabsController.available');
      } else{
        alert("Please fill out the form.");
      }
    };

    $scope.goToState = function(info){
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

  .controller('availableCtrl', function($scope, Items, $state) {
  })

  .controller('exampleCtrl',  function($scope, $stateParams, Users, $state, $firebaseObject) {
    $scope.params = $stateParams;
    console.log($stateParams);
    $scope.users = Users.get($scope.params["info"]["$id"]);
    console.log($scope.params["info"]["$id"]);
    $scope.openChat = function() {
      var curr = JSON.parse(document.getElementById('account-details').textContent);
      var ref = new Firebase("https://test-7422a.firebaseio.com/users/" + curr.uid);
      var user = $firebaseObject(ref);
      firebase.database().ref('cars/' + $scope.params["info"]["$id"] + '/users').once('value').then(function(snapshot) {
        console.log(snapshot.numChildren());
        var numPeople = snapshot.numChildren();
        if(numPeople < 3){
          user.$loaded().then(function() {
            console.log("loaded record:", user.$id, user.name);

            $scope.users.$add({
              "name": user.name,
              "venmo": user.venmo,
              "phone": user.phone,
              "school": user.school,
              "desc": user.desc,
              "year": user.year,
              "img": "img/1.png"
            });
         });
       } else {
         alert("Sorry this car is full. Please choose another.");
       }
      });
      // $state.go('chat');
    };
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

  .controller('createProfileCtrl', ['$state', '$scope', '$stateParams', 'Profiles', '$firebaseObject',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($state, $scope, $stateParams, Profiles, $firebaseObject) {
      $scope.profiles = Profiles;
      $scope.new_profile = {};

      $scope.addProfile = function() {
        if(Object.keys($scope.new_profile).length != 0){
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
          user.$save().then(function () {
              console.log(user);
          });
          $state.go('tabsController.available');
        } else{
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

  .controller('chatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }
  ])
