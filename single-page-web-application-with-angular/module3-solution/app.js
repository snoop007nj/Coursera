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
      console.log(menu.found);
    } else {
      menu.found = [];
      menu.getMessage();
      console.log("menu.message:", menu.message);
    }
  };

  menu.getMessage = function() {
    if (menu.found.length == 0) {
      console.log("Nothing found");
      menu.message = "Nothing found";
    }
  }

  // menu.getMatchedMenuItems = function () {
  //   var promise = MenuSearchService.getMatchedMenuItems();
  //   promise.then(function (response) {
  //     menu.items = response.data["menu_items"];
  //     var i;
  //     menu.found = [];
  //     for (i = 0; i < menu.items.length; i++) {
  //       if ( menu.searchTerm && menu.items[i].description.indexOf(menu.searchTerm) != -1 ) {
  //         menu.found.push({'name':menu.items[i].name,
  //           'short_name':menu.items[i].short_name,
  //           'description':menu.items[i].description});
  //       }
  //     }
  //
  //     if (!menu.searchTerm || menu.found.length==0) {
  //       console.log("Nothing found");
  //     } else {
  //       console.log(menu.found.length, "objects");
  //       for (i = 0; i < menu.found.length; i++) {
  //         console.log(menu.found[i]);
  //       }
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
// function MenuSearchService($http, ApiBasePath) {
//   var service = this;
//
//   service.getMatchedMenuItems = function () {
//     var response = $http({
//       method: "GET",
//       url: (ApiBasePath + "/menu_items.json"),
//     });
//
//     return response;
//   };
//
// }

function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var foundItems = [];

    searchTerm = searchTerm.trim().toLowerCase();
    console.log(searchTerm);

    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (response) {

      var i;
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

}

})();
