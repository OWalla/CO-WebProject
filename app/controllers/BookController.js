// Code goes here

(function() {
    var app = angular.module("myApp");

    function BookController($scope, BookService) {

        $scope.name = "";
        $scope.author = "";
        $scope.afterYear = "";

        $scope.search = function() {
            BookService.search($scope.name, $scope.author, $scope.afterYear).then(function(data) {
                alert(data);
                $scope.books = data;
            })
        }

    }

    app.controller("BookController", ["$scope", 'BookService', BookController]);

})();
