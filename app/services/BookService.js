angular.module('myApp')
    .factory('BookService', ['$http', function($http) {
        var baseUrl = "http://localhost:8080";

        return {
            search: function(name, author, yearFrom) {
                return $http.get(baseUrl + "/book/list/" + name + "/" + author + "/" + yearFrom)
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }]);
