angular.module('myApp')
    .factory('CommentService', ['$http', function($http) {
        var baseUrl = "http://localhost:8080";

        return {
            create: function(comment) {
                return $http.post(baseUrl + "/comment/put", comment).then(function(response) {
                    return response.data;
                })
            }
        }
    }]);
