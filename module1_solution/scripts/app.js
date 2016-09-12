(function(){

  'use strict';
  angular.module('LunchCheckApp', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope){

    $scope.lunchMenu = "";
    $scope.message = "";

    $scope.checkMenu = function() {

      var menuStr = $scope.lunchMenu.trim();

      if (menuStr.length == 0) {
        $scope.message = "Please enter some data";
        return;
      }
      var tokenList = menuStr.split(",");
      var count = 0;

      for (var i in tokenList) {
        if(tokenList[i].trim().length > 0) {
          count++;
        }
      }

      if (count <= 3) {
          $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too Much!";
      }
    };
  };


})();
