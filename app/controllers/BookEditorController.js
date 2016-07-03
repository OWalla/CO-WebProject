// Code goes here

(function() {
    var app = angular.module("bookApp");

    function BookEditorController($scope, $routeParams, $location, BookService) {

        if (!$routeParams.id) {
            $scope.title = "Create book";
        } else {
            BookService.details($routeParams.id).then(function(result) {
                $scope.book = result;
            });
            $scope.title = "Edit book";
        }

        $scope.sendData = function() {
            BookService.sendData($scope.book).then(function(result) {
                alert(result);

                if ($routeParams.id) {
                  $location.path('/book/details/' + $routeParams.id);
                } else {
                  $location.path('/book/list');
                }
            })
        }

    }

    app.controller("BookEditorController", ["$scope", "$routeParams", '$location', 'BookService', BookEditorController]);

})();
