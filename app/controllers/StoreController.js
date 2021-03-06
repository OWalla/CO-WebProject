// Code goes here

(function() {
    var app = angular.module("storeApp");

    function StoreController($scope, StoreService) {

        $scope.store = {};
        $scope.name = "";
        $scope.address = "";
        $scope.rank = "";

        $scope.search = function() {
            StoreService.search($scope.name, $scope.address, $scope.rank).then(function(data) {
                $scope.stores = data;
                siteGraph.createStoreRankGraph(data);
                resetMarkes(data);
            })
        };

        $scope.search();

    }

    app.controller("StoreController", ["$scope", 'StoreService', StoreController]);

})();
