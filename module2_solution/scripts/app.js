(function(){

  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  /**
   * [$inject description]
   * @type {Array}
   */
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){

    var toBuy = this;

    toBuy.items  = ShoppingListCheckOffService.getToBuy();
    toBuy.buyItem = function (index) {


      ShoppingListCheckOffService.buy(index);
    };

  }

/**
 * [$inject description]
 * @type {Array}
 */
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {

    var boughtItems = this;
    boughtItems.items = ShoppingListCheckOffService.getBought();

  }

/**
 * [ShoppingListCheckOffService description]
 */
  function ShoppingListCheckOffService() {

    var service = this;

    var itemsToBuy = [ { name: "cookies", quantity: 10 },
                  { name: "cakes", quantity: 12 },
                  { name: "sweet drinks", quantity: 5 },
                  { name: "milk", quantity: 4 },
                  { name: "juice", quantity: 7 }];

    var itemsBought = [];

    service.getToBuy = function () {

      console.log(itemsToBuy);
      return itemsToBuy;
    };

    service.getBought = function () {
      return itemsBought;
    };

    service.buy = function (index) {

      var itemToBuy = itemsToBuy[index];
      itemsToBuy.splice(index, 1);
      itemsBought.push(itemToBuy);
    }

  }

})();
