(function () {
'use strict';

var shoppingList = [
  {
    name: "Cookies",
    quantity: 10
  },
  {
    name: "Milk",
    quantity: 2
  },
  {
    name: "Donuts",
    quantity: 200
  },
  {
    name: "Cookies",
    quantity: 300
  },
  {
    name: "Chocolate",
    quantity: 5
  }
];

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
function ShoppingListAddController(ShoppingListCheckOffService) {

  var itemAdder = this;

  itemAdder.shoppingList = shoppingList;
  itemAdder.itemIndex = "";
  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.buyItem = function (index, name, quantity) {
    itemAdder.itemIndex = index;
    itemAdder.itemName = name;
    itemAdder.itemQuantity = quantity;

    console.log(itemAdder.itemIndex, itemAdder.itemName, itemAdder.itemQuantity);

    //add item to list of bought items
    ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);

    //remove item from list of to buy items
    itemAdder.shoppingList.splice(itemAdder.itemIndex, 1);
  };

};


ShoppingListShowController.$inject = ['ShoppingListCheckOffService'];
function ShoppingListShowController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();
