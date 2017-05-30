(function() {
'use strict';

angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/menuapp/templates/itemscomponent.template.html',
    bindings: {
      items: '<'
    }
  });

})();
