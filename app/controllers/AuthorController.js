// Code goes here

(function() {
    var app = angular.module("myApp");

    function AuthorController($scope, BookService) {

        BookService.getAuthorsBookData().then(function(data) {
            $scope.authors = data;
            siteGraph.createPopularBooksGraph($scope.authors);
        })
    }

    app.controller("AuthorController", ["$scope", 'BookService', AuthorController]);

})();
