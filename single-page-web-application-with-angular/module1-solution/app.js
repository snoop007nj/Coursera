(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.entry = "";
  $scope.numEntry = 0;
  $scope.msg = "";

  $scope.check = function () {

    if ($scope.entry.length == 0) {
      $scope.numEntry = 0;
    } else {
      $scope.numEntry = $scope.entry.split(",").length;
    }

    if ($scope.numEntry == 0) {
      $scope.msg = "Please enter data first";
    } else if ($scope.numEntry >=1 && $scope.numEntry <=3) {
      $scope.msg = "Enjoy";
    } else {
      $scope.msg = "Too much";
    }

    console.log($scope.numEntry);

  };

  $scope.setColor = function () {
    if ($scope.msg == "Please enter data first") {
      return {'color':'red'};
    } else {
      return {'color':'green'};
    }
  }
}

})();
