angular.module('storeApp')
    .factory('StoreService', ['$http', function($http) {
        var baseUrl = "http://localhost:8080";

        return {
            search: function(name, address, rank) {
                return $http.get(baseUrl + "/store/list/" + name + "/" + address + "/" + rank)
                    .then(function(response) {
                        return response.data;
                    })
            }
        }
    }]);
