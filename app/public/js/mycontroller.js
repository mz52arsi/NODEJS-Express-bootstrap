angular.module('myAppFilters', []).filter('DateTime', function() {
  return function(input) {
	  var dt = new Date(input)
    return dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
  };
});

var myApp = angular.module('myApp', ['ngRoute','myAppFilters']);

myApp.filter('ArrayCount', function () {
  return function (input) {
	  
	    return input === undefined ? -1 : input.length;
  };
});
myApp.filter('MemberDetails', function () {
  return function (input) {
	    return memberStore.getMemberDetails(input);
  };
});


myApp.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '\main.html',
      }).
	  
  });

myApp.controller('MemberController', function ($scope,$http) {

	
  $scope.home = function (credentials) {
	  $http.post('/members', {'username':credentials.username,'password':credentials.password}).
	  success(function(data, status, headers, config) {
		console.log(data);
	  }).
	  error(function(data, status, headers, config) {
		  console.log(data);
	  });
  };
});


  
