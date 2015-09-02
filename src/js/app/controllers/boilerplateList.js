'use strict';

angular.module('npm-boilerplate-browser')
  .controller('BoilerplateListCtrl', function ($scope, $http, $location, $q) {

    var fields = ['name','keywords','rating','description','author','modified','homepage','version'];

    var initialFetchSize = 20;

    var formatResult = function(data){
      fields.forEach(function(k){
        if (k === 'keywords') return;
        if (!Array.isArray(data[k])) return;
        data[k] = data[k][0];
      });
      return data;
    };

    var formatData = function(data){
      var out = {
        results: data.results.map(formatResult),
        total: data.total
      };
      return out;
    };

    var makeRequest = function (start, size) {
      return $http.get('http://npmsearch.com/query', {
        params: {
          q: ['keywords:boilerplate'],
          fields: fields.join(','),
          start: start,
          size: size,
          sort: 'rating:desc'
        },
        transformResponse: $http.defaults.transformResponse.concat([formatData])
      });
    };

    var sortBy = function () {
      var args = arguments;

      return function (a, b) {
        var scoreA, scoreB;

        for (var i = 0, len = args.length; i < len; i++) {
          scoreA = args[i](a);
          scoreB = args[i](b);
          if (scoreA < scoreB) {
            return -1;
          } else if (scoreA > scoreB) {
            return 1;
          }
        }

        return 0;
      };
    };

    var sortResults = function (results) {
      return results.sort(sortBy(
        function (boilerplate) {
          return $scope.preExisting[boilerplate.name] ? 1 : 0;
        },
        // Sort highly-rated boilerplates to top
        function (boilerplate) {
          return -boilerplate.rating;
        },
        // Fall back to sort by name
        function (boilerplate) {
          return boilerplate.name;
        }
      ));
    };

    $q.all([$http.get('pre-existing.json'), makeRequest(0, initialFetchSize)])
      .then(function (responses) {
        $scope.preExisting = responses[0].data;
        $scope.data = sortResults(responses[1].data.results);
        return makeRequest(initialFetchSize, responses[1].data.total);
      })
      .then(function (response) {
        $scope.data = sortResults($scope.data.concat(response.data.results));
        if (angular.isString(($location.search()).q)) {
          $scope.search = ($location.search()).q;
        }
      });

    $scope.orderByKeywords = function (item) {
      return (item === 'boilerplate') ? -1 : 0;
    };

    $scope.filterNames = function (item) {
      return item.name.indexOf('boilerplate-') === 0;
    };

    $scope.excludePreExisting = function (item) {
      return (item && !$scope.preExisting[item.name]);
    };
  });
