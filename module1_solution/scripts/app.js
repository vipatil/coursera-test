(function(){

  'use strict';
  angular.module('LunchCheckApp', ['angular-growl'])

  .config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
  }])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', 'growl']
  function LunchCheckController($scope, growl){

    $scope.lunchMenu = "";
    $scope.message = "";

    $scope.checkMenu = function() {

      var config = {};
      var menuStr = $scope.lunchMenu.trim();

      if (menuStr.length == 0) {
        //$scope.message = "Please enter some data";
        growl.error("Please enter some data");
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
          //$scope.message = "Enjoy!";
          growl.success("Enjoy!!");
      } else {
          growl.warning("Too Much!");
        //$scope.message = "Too Much!";
      }
    };
  };


})();
