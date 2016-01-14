angular.module('starter')
	.controller("loginCtrl", function($scope, $http, $state){
		$scope.user = {};
		$scope.doLogin = function(){
			$http.post("/api/login", {data : $scope.user})
				.success(function(response){
					if(response.token){
						localStorage.setItem('token', response.token);
						$state.go("home");
					}
				})
				.error(function(err){
					console.log(err);
				});
		};
		
	})
	.controller("signupCtrl", function($scope, $http, $state){
		$scope.user = {};
		$scope.signupUser = function(eve){
			$http.post("/api/signup", {data : $scope.user})
				.success(function(response){
					console.log(response);
					$state.go("login");
				})
				.error(function(err){
					console.log(err);
				});
		};
		
		
	})
	.controller("homeCtrl", function($scope, $http){
	
		$http.get("/api/salesmen")
		.success(function(response){
			console.log(response);
		})
		.error(function(){
			console.log("Error in finding User");
		});
		
	});
	
	