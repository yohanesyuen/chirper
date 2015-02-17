angular.module('chirper', [])

.controller('newChirpCtrl',['$scope', '$http', function($scope, $http){
  $scope.chirpContent = 'Chirp Something! :D';
  $scope.chirp = function(){
    var content = {content: $scope.chirpContent};
    console.log(content.content);
    console.log($http.post('/upload', content));
    $scope.chirpContent = '';
  };
}]);
