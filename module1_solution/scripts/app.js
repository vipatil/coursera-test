(function(){

  'use strict';
  angular.module('LunchCheckApp', ['angular-growl'])

  .config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
  }])

  .controller('LunchCheckController', LunchCheckController);

  /**
   * [$inject description]
   * @type {Array}
   */
  LunchCheckController.$inject = ['$scope', 'growl']
  function LunchCheckController($scope, growl){

    $scope.lunchMenu = "";
    /**
     * [checkMenu description]
     * @return {[type]} [description]
     */
    $scope.checkMenu = function() {
      var config = {};
      var menuStr = $scope.lunchMenu.trim();

      if (menuStr.length == 0) {
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
          growl.success("Enjoy!!");
      } else {
          growl.warning("Too Much!");
      }
    };
  };
})();
