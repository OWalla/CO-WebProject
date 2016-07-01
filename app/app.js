// Declare app level module which depends on filters, and services
angular.module('myApp', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'views/1', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partial/2', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
    $locationProvider.html5Mode(true);
}]);