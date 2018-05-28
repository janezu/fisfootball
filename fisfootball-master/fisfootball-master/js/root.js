var helloAjaxApp = angular.module("root", []);

helloAjaxApp.controller("index", ['$scope', '$http', function($scope, $http) {
	$scope.data;
	$scope.team;
	$scope.number;
	$scope.ekipa;
	$scope.players;
	$scope.roster;
	$scope.tmp;
	$scope.getTeam = function(){
		var data;
		var headers={ 'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee' };
		var url = 'http://api.football-data.org/v1/'+$scope.team+"/"+$scope.number;
		var res = $http({method: 'GET', url, headers: {
		'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee'}
		});
		res.success(function(response) {
			$scope.data = response;
		});
		res.error(function(response) {
			alert( "failure message: " + response);
		});
	};
	$scope.roster = [];
	$scope.getPlayers = function(){

		var players;
		var url = 'http://api.football-data.org/v1/teams/'+$scope.ekipa+'/players/';
		var res = $http({method: 'GET', url, headers: {
		'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee'}
		});
		res.success(function(response) {
			$scope.tmp = angular.fromJson(response.players)
			for (i=0; i < $scope.tmp.length; i++){
			$scope.roster.push(angular.fromJson(response.players[i]));
			}

		});
		res.error(function(response) {
			alert( "failure message: " + response);
		});
	};
	$scope.reset = function(){
		$scope.roster.length = 0;
	};
}]);
