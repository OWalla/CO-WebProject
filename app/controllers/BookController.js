// Code goes here

(function() {
    var app = angular.module("myApp");

    function BookController($scope, BookService) {

        $scope.book = {};
        $scope.name = "";
        $scope.author = "";
        $scope.afterYear = "";

        $scope.search = function() {
            BookService.search($scope.name, $scope.author, $scope.afterYear).then(function(data) {
                $scope.books = data;
            })
        }

        $scope.search();

    }

    app.controller("BookController", ["$scope", 'BookService', BookController]);

})();
