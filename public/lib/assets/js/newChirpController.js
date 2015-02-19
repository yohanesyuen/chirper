angular.module('chirper', [])

.controller('newChirpCtrl',['$scope', '$http', function($scope, $http){
  $scope.chirp = function(){
    var content = {content: $scope.chirpContent};
    console.log($http.post('/upload', content));
    $scope.chirpContent = '';
  };
}]);
