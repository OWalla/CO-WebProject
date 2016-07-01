// Declare app level module which depends on filters, and services

(function() {
    var app = angular.module("myApp", ["ngRoute"]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/book/list", {
                templateUrl: "../views/book/list.html",
                controller: "BookController"
            })
    }]);
}());
