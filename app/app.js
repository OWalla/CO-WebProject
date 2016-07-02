// Declare app level module which depends on filters, and services

(function() {
    var app = angular.module("myApp", ["ngRoute"]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "../views/main.html"
            })
            .when("/book/list", {
                templateUrl: "../views/book/list.html",
                controller: "BookController"
            })
            .when("/book/create", {
                templateUrl: "../views/book/create.html",
                controller: "BookController"
            })
            .when("/book/author", {
                templateUrl: "../views/book/author.html",
                controller: "AuthorController"
            })
            .when("/book/details/:id", {
                templateUrl: "../views/book/details.html",
                controller: "BookDetailsController"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }]);
}());
