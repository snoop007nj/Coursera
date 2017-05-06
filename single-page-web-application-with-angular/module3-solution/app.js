(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      message: '@myMessage',
      found: '<onRemove',
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";
  menu.found = [];

  //user pressed narrowItDown button
  menu.narrowItDown = function () {
    menu.message = "";

    if ( menu.searchTerm.trim() ) {
      menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    } else {
      menu.found = [];
      menu.getMessage();
    }
  };

  menu.getMessage = function() {
    if (menu.found.length == 0) {
      console.log("Nothing found");
      menu.message = "Nothing found";
    }
  }

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.menuSize = 0;

  service.getMatchedMenuItems = function (searchTerm) {
    var foundItems = [];

    searchTerm = searchTerm.trim().toLowerCase();
    console.log(searchTerm);

    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (response) {

      var i;
      service.menuSize = response.data.menu_items.length;
      console.log("menuSize:", service.menuSize);
      for (i = 0; i < response.data.menu_items.length; i++) {
        if ( response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
          foundItems.push(response.data.menu_items[i]);
        }
      }

    }).catch(function (error) {
      console.log(error);
    });

    return foundItems;
  };

  service.getMenuSize = function () {
    return service.menuSize;
  }

}

})();
