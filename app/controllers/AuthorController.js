// Code goes here

(function() {
    var app = angular.module("myApp");

    function AuthorController($scope, BookService) {

        BookService.getAuthorsBookData().then(function(data) {
            $scope.authors = data;
            var booksData = angular.toJson($scope.authors);
            siteGraph.createPopularBooksGraph(booksData);
        })
    }

    app.controller("AuthorController", ["$scope", 'BookService', AuthorController]);

})();
