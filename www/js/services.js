angular.module('app.services', [])

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://test-7422a.firebaseio.com/cars");
  return $firebaseArray(itemsRef);
  // console.log("items")
  // return {
  //   get: function(find){
  //     console.log(find.from);
  //     var ref = new Firebase("https://test-7422a.firebaseio.com/cars");
  //     return $firebaseArray(ref.orderByChild("from").startAt(find.from));
  //   }
  // }
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
