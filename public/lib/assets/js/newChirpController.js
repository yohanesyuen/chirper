angular.module('chirper.controllers', [])

.controller('newChirpCtrl',['$scope', '$http', function($scope, $http){
  $scope.chirp = function(){
    if($scope.chirpContent){
      var content = {content: $scope.chirpContent.trim()};
      $http.post('/upload', content)
      .success(function(data, status, headers, config) {
        console.log(data);
        $('.feed').html(data);
      })
      .error(function(data, status, headers, config) {

      });
      $scope.chirpContent = '';
    }
    else
      return;
  };
}]);
