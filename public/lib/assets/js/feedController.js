angular.module('chirper.controllers')

.controller('feedCtrl', ['$scope', '$http', function($scope, $http){
  $scope.chirps = ['chirp chirp!'];
  $http.get('/api/users/feed').
  success(function(data, status, headers, config){
    var chirps = data;
    $scope.chirps=data;
    for (i in $scope.chirps){
      $scope.chirps[i].pretty_time = moment(new Date($scope.chirps[i].created_at)).fromNow();
    }
  }).
  error(function(data, status, headers, config){

  });
}]);
