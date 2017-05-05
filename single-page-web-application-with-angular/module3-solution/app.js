(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      menu: '=foundItems'
    }
  };

  return ddo;
}


MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

  menu.getMenuItem = function () {
    var promise = MenuCategoriesService.getMenuItem();
    promise.then(function (response) {
      menu.items = response.data["menu_items"];
      var i;
      menu.found = [];
      for (i = 0; i < menu.items.length; i++) {
        if ( menu.searchTerm && menu.items[i].description.indexOf(menu.searchTerm) != -1 ) {
          menu.found.push({'name':menu.items[i].name,
            'short_name':menu.items[i].short_name,
            'description':menu.items[i].description});
        }
      }

      if (!menu.searchTerm || menu.found.length==0) {
        console.log("Nothing found");
      } else {
        console.log(menu.found.length, "objects");
        for (i = 0; i < menu.found.length; i++) {
          console.log(menu.found[i]);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuItem = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response;
  };

}

})();
