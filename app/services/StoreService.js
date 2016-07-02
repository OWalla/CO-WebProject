angular.module('myApp')
    .factory('StoreService', ['$http', function($http) {
        var baseUrl = "http://localhost:8080";

        return {
            search: function() {
                return $http.get(baseUrl + "/store/list")
                    .then(function(response) {
                        return response.data;
                    })
            }
        }
    }]);
