// Declare app level module which depends on filters, and services

(function() {

    var mainApp = angular.module("mainApp", ["ngRoute", "bookApp", "storeApp"]);

    mainApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/store/list", {
            templateUrl: "../views/store/list.html",
            controller: "StoreController"
        })
            .otherwise({
                redirectTo: "/main"
            });
    }]);

    var storeApp = angular.module("storeApp", ["ngRoute"]);

    storeApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "../views/main.html"
            })
            .otherwise({
                redirectTo: "/main"
            });
    }]);

    var bookApp = angular.module("bookApp", ["ngRoute"]);

    bookApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/book/list", {
                templateUrl: "../views/book/list.html",
                controller: "BookController"
            })
            .when("/book/create", {
                templateUrl: "../views/book/create.html",
                controller: "BookEditorController"
            })
            .when("/book/edit/:id", {
                templateUrl: "../views/book/create.html",
                controller: "BookEditorController"
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
