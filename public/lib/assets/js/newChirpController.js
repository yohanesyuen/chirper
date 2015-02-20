angular.module('chirper', [])

.controller('newChirpCtrl',['$scope', '$http', function($scope, $http){
  $scope.chirp = function(){
    if($scope.chirpContent){
      var content = {content: $scope.chirpContent.trim()};
      console.log($http.post('/upload', content));
      $scope.chirpContent = '';
    }
    else
      return;
  };
}]);
