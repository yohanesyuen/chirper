'use strict'

var chirper = angular.module('chirper', []); // Taking Angular Application in Javascript Variable

// Below is the code to allow cross domain request from web server through angular.js
chirper.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

chirper.controller('newChirpCtrl',['$scope', '$http', function($scope, $http){
  $scope.chirp = function(){
    var content = {content: $scope.chirpContent};
    $http.post('/upload', content);
    $scope.chirpcontent = '';
  };
}]);
