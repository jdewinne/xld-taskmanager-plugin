angular.module('TaskApp').factory('jsonHttp', function ($http, $q) {

    var successWrapper = function(result) {
        return result.data;
    };

    var errorWrapper = function(error) {
        return $q.reject(error.data || error.message);
    };

    var mergeConfigs = function(c1, c2) {
        return c2 ? angular.extend(c1, c2) : c1;
    };

    return {
        'get': function(url, config) {
            var defaults  = {"headers": {"Accept": 'application/json'}};
            return $http.get(url, mergeConfigs(defaults, config)).then(successWrapper, errorWrapper);
        },
        'post': function(url, data, config) {
            var defaults = {"headers": {"Accept": 'application/json', "Content-Type": 'application/json'}};
            return $http.post(url, data || '', mergeConfigs(defaults, config)).then(successWrapper, errorWrapper);
        }
    };

}).factory('xJsonHttp', function (jsonHttp) {

    var entityExtractor = function(data) {return data.entity};

    return {
        'get': function(url, config, custom) {
            if (custom) {
                return jsonHttp.get(url, config).then(entityExtractor);
            }
            return jsonHttp.get(url, config);
        },
        'post': function(url, data, config) {
            return jsonHttp.post(url, data, config).then(entityExtractor);
        }
    };

});;