
angular.module('app.controllers', [])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('welcomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

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

  .controller('availableCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
  ])

  .controller('exampleCtrl',  function($scope, $stateParams, Users) {
    $scope.params = $stateParams;
    console.log($stateParams);
    $scope.users = Users.get($scope.params["info"]["$id"]);
    console.log($scope.users);
    // TODO join a car. get User info from Users table and add it to the car

  })

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {
      $scope.data = {};

      $scope.signupEmail = function() {

        var ref = new Firebase("https://test-7422a.firebaseio.com/");

        ref.createUser({
          email: $scope.data.email,
          password: $scope.data.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });

      };

      $scope.loginEmail = function() {

        var ref = new Firebase("https://test-7422a.firebaseio.com/");
          //$scope.data.email, $scope.data.password
          ref.auth("adf").signInWithEmailAndPassword("tonya.jiang@gmail.com", "tonyajiang").catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ...
        });

      };

    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('createProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])

  .controller('editCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
  ])
