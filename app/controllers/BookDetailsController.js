// Code goes here

(function () {
    var app = angular.module("myApp");

    function BookDetailsController($scope, $routeParams, BookService, CommentService) {

        BookService.details($routeParams.id).then(function (result) {
            $scope.book = result;
            $scope.comments = result.comments;
        });

        $scope.comment;

        $scope.postComment = function () {
            var comment = {title: $scope.comment.title,
                           content: $scope.comment.content,
                           User: $scope.comment.user,
                           book: $routeParams.id};
            CommentService.create(comment).then(function (result) {
                alert(result);
            });
        }
    }

    app.controller("BookDetailsController", ["$scope", "$routeParams", 'BookService', 'CommentService', BookDetailsController]);

})();
