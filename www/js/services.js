angular.module('app.services', [])

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://test-7422a.firebaseio.com/cars");
  return $firebaseArray(itemsRef);
})

.factory("Users", function($firebaseArray) {
  // var itemsRef = new Firebase("https://test-7422a.firebaseio.com/"+$scope.id+"/users");
  // return $firebaseArray(usersRef);
  return {

    get: function(id) {
      var usersRef = new Firebase("https://test-7422a.firebaseio.com/cars/"+id+"/users");
      return $firebaseArray(usersRef);
    }
  }
})
.service('BlankService', [function(){

}]);
