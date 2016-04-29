var myApp = angular.module('myApp',['br.fullpage']);

myApp.factory('mainFactory',function () {
	// body...
	var factory = {}
	
	return factory;
})

myApp.controller('mainController',function ($scope, mainFactory) {
	// body...
	var intro = "Full Stack Web Developer"
	$scope.intro ='';
	var i=0;
	var timer = setInterval(function(){
	 if(i<intro.length){
	  	$scope.intro += intro[i];
	     i++; 
	   }
		 $scope.$apply();
	},300)


})
