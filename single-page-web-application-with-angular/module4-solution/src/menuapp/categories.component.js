(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categoriescomponent.template.html',
  // templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
