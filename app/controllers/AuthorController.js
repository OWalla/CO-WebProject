// Code goes here

(function() {
    var app = angular.module("bookApp");

    function AuthorController($scope, BookService) {

        BookService.getAuthorsBookData().then(function(data) {
            $scope.authors = data;

            // convert the data to the format siteGraph expect
            var gData = Array.from(data, function(b) {
                return {
                    Name : b._id,
                    Count : b.count
                };
            });
            siteGraph.createPopularUsersGraph(gData);
        })

    }

    app.controller("AuthorController", ["$scope", 'BookService', AuthorController]);

})();
