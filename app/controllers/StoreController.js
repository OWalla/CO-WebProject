// Code goes here

(function() {
    var app = angular.module("myApp");

    function StoreController($scope, StoreService) {

        $scope.store = {};
        $scope.name = "";
        $scope.address = "";
        $scope.rank = "";
        $scope.phone = "";

        $scope.search = function() {
            StoreService.search($scope.name, $scope.address, $scope.rank).then(function(data) {
                $scope.stores = data;
                siteGraph.createBooksTimelineGraph(data);
            })
        };

        $scope.search();

    }

    app.controller("StoreController", ["$scope", 'StoreService', StoreController]);

})();
