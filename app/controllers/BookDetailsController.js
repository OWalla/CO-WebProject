// Code goes here

(function() {
    var app = angular.module("bookApp");

    function BookDetailsController($scope, $routeParams, $location, BookService, CommentService) {

        var server = io();
        server.on('add comment', function (data) {
            alert(data.user + " has posted a new comment!");
        })

        BookService.details($routeParams.id).then(function(result) {
            $scope.book = result;
            $scope.comments = result.comments;
        });

        $scope.comment = {};
        $scope.comment.bookId = $routeParams.id;

        $scope.postComment = function() {
            CommentService.create($scope.comment).then(function(result) {
                alert(result);
                server.emit('new comment', {user: $scope.comment.user});
            });
        }

        $scope.deleteBook = function() {
            BookService.remove($routeParams.id).then(function(result) {
                alert(result);
                $location.path('/book/list');
            });
        }

        $scope.editBook = function() {
            $location.path('/book/edit/' + $routeParams.id);
        }
    }

    app.controller("BookDetailsController", ["$scope", "$routeParams", "$location", 'BookService', 'CommentService', BookDetailsController]);

})();
