// Code goes here

(function() {
    var app = angular.module("myApp");

    function StoreController($scope, StoreService) {

        $scope.store = {};
        $scope.address = "";
        $scope.rank = 0;
        $scope.phone = "";

        $scope.search = function() {
            StoreService.search($scope.name).then(function(data) {
                $scope.stores = data;
            })
        };

        $scope.search();

    }

    app.controller("StoreController", ["$scope", 'StoreService', StoreController]);

})();
