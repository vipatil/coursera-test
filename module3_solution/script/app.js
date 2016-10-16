(function() {

  'use strict';

  /**
   * Module
   */
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemDirective);


  /**
   * [FoundItemDirective description]
   */
  function FoundItemDirective() {

    var ddo = {
      templateUrl:'found-item.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  /**
   * [FoundItemsDirectiveController description]
   */
  function FoundItemsDirectiveController() {
    var list = this;
  }

  /**
   * [$inject description]
   * @type {Array}
   */
  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {

    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.foundItems = [];

    ctrl.removeItem = function (itemIndex) {

      console.log("'this' is: ", this);
      ctrl.foundItems.splice(itemIndex, 1);
      // this.title = origTitle + " (" + list.items.length + " items )";
    };

    ctrl.found = function() {

      var promise =  MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      if (promise)  {
        promise.then(function (result) {
          //console.log(result);
          if (result) {
            ctrl.foundItems = result;
            console.log(ctrl.foundItems.length);
          }
        });
      } else {
        ctrl.foundItems = [];
      }//if
    };//ctrl.found
  };

  /**
   * [$inject description]
   * @type {Array}
   */
  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {

    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {

      if (!searchTerm || searchTerm.length == 0 ) {
        return undefined;
      }

      console.log(searchTerm);
      var promise = $http({
        method: "GET",
        url:(ApiBasePath + '/menu_items.json')
      });

      return promise.then(function (result) {

        var foundItems = [];
        var menuItems = result.data.menu_items;

        var item;
        for (var index in menuItems ) {
          var item = menuItems[index];
          var des = item["description"];
          if (des.includes(searchTerm) )  {
            foundItems.push(item);
          }
        }
        console.log(foundItems.length);
        return foundItems;
      });
    };
  }


})();
