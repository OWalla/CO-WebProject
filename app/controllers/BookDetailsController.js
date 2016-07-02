// Code goes here

(function() {
    var app = angular.module("myApp");

    function BookDetailsController($scope, $routeParams, BookService) {

        BookService.details($routeParams.id).then(function(result) {
            $scope.book = result;
        })
    }

    app.controller("BookDetailsController", ["$scope", "$routeParams", 'BookService', BookDetailsController]);

})();
