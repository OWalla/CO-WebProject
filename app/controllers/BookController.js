// Code goes here

(function() {
    var app = angular.module("bookApp");

    function BookController($scope, $location, BookService) {

        $scope.book = {};
        $scope.name = "";
        $scope.author = "";
        $scope.afterYear = "";

        $scope.search = function() {
            BookService.search($scope.name, $scope.author, $scope.afterYear).then(function(data) {
                $scope.books = data;
            })
        }

        $scope.createBook = function() {
            $location.path('/book/create');
        }

        $scope.search();

    }

    app.controller("BookController", ["$scope", '$location', 'BookService', BookController]);

})();
