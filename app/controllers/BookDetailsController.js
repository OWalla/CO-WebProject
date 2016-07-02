// Code goes here

(function() {
    var app = angular.module("myApp");

    function BookDetailsController($scope, $routeParams, BookService, CommentService) {

        BookService.details($routeParams.id).then(function(result) {
            $scope.book = result;
            $scope.comments = result.comments;
        });

        $scope.comment = {};
        $scope.comment.bookId = $routeParams.id;

        $scope.postComment = function() {
            console.log($scope.comment);
            CommentService.create($scope.comment).then(function(result) {
                alert(result);
            });
        }
    }

    app.controller("BookDetailsController", ["$scope", "$routeParams", 'BookService', 'CommentService', BookDetailsController]);

})();
