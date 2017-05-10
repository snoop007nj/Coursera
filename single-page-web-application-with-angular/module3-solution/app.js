(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'A',
    scope: {
      found_directive: '<foundItems',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var menu = this;

  console.log("...FoundItemsDirectiveController()");

  menu.itemsInFound = function () {
    return (menu.found_directive ? (!(menu.found_directive.length != 0) ? true : false) : false);
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  console.log("...NarrowItDownController()");

  var menu = this;

  menu.searchTerm = "";

  //user pressed narrowItDown button
  menu.narrowItDown = function () {
    menu.found = [];
    menu.itemsInFound = false;
    if ( menu.searchTerm.trim() ) {
      MenuSearchService.getMatchedMenuItems(menu.searchTerm)
      .then(function (response) {
        menu.found = response;
        if (menu.found.length == 0) {
          menu.itemsInFound = true;
        }
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
        menu.itemsInFound = true;
      });

    } else {
      menu.itemsInFound = true;
    }
  };

  menu.removeItem = function(itemIndex) {
    menu.found.splice(itemIndex, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  console.log("...MenuSearchService()");

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var foundItems = [];

    searchTerm = searchTerm.trim().toLowerCase();

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (response) {
      for (var i = 0; i < response.data.menu_items.length; i++) {
        if ( response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ) {
          foundItems.push(response.data.menu_items[i]);
        }
      }
      return foundItems;
    })

  };
}

})();
