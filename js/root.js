var helloAjaxApp = angular.module("root", []);

helloAjaxApp.controller("index", ['$scope', '$http', function($scope, $http) {
	$scope.data = {};
	$scope.datas = {};
	$scope.dat={};
	$scope.da={};
	$scope.leagueView;
	$scope.data.standing;
	$scope.currentView = 'someView';
	$scope.players;
	$scope.roster;
	$scope.tmp;
	$scope.rosterView;
	$scope.y = [];
	$scope.x;

	$scope.showLeague= function(){
		$scope.leagueView = "show";
		$scope.scrollTo('standing');
	}
	$scope.showRoster= function(){
		$scope.rosterView = "show";
	}
	$scope.hideLeague= function(){
		$scope.leagueView = "hide";
	}
	$scope.hideRoster= function(){
		$scope.rosterView = "hide";
	}
	$scope.getTeam = function(url2){


		var headers={ 'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee' };
		var url = url2;
		var result = $http({method: 'GET', url, headers: {
		'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee'}
		});
		result.success(function(respond) {
			$scope.dat = respond;
		});
		result.error(function(respond) {
			alert( "failure message: " + respond);
		});

	};
	$scope.getTeamh= function(urlt){
		var headers={ 'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee' };
		var url = urlt;
		var resu = $http({method: 'GET', url, headers: {
		'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee'}
		});
		resu.success(function(respo) {
			$scope.da = respo;
		});
		resu.error(function(respo) {
			alert( "failure message: " + respo);
		});
	};

	$scope.roster = [];
	$scope.getPlayers = function(url1){
		var players;
		$scope.rosterView = "show";
		var url = url1 +'/players/';
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

	$scope.getStanding = function(nr){
		var data;
		var id = nr;
		$scope.rosterView = "";
		var headers={ 'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee' };
		var url = 'http://api.football-data.org/v1/competitions/'+id+'/leagueTable';
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

	$scope.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

};
		$scope.getFixtures = function(url2){
						var datas;
						var headers={ 'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee' };
						var url = url2+'/fixtures';
						var res = $http({method: 'GET', url, headers: {
						'X-Auth-Token': 'e135ce04a942427cb287aaf2f8bec7ee'}
						});
						res.success(function(response) {
							$scope.datas = response;
							$scope.x= $scope.datas.count-5;
							var y=[];

							for(var i=$scope.datas.fixtures.length - 1; i > $scope.datas.fixtures.length - 6; i--){
								$scope.y.push($scope.datas.fixtures[i]);

							}
							$scope.datas.fixtures = $scope.y;
						});
						res.error(function(response) {
							alert( "failure message: " + response);
						});
					};

				$scope.result = function(x,y,z){

					if(x>y){

						document.getElementById(z+"h").innerHTML = "W";
						document.getElementById(z+"a").innerHTML = "L";
					}
					if(x<y){

						document.getElementById(z+"h").innerHTML = "L";
						document.getElementById(z+"a").innerHTML = "W";}

					if(x==y){
						document.getElementById(z+"h").innerHTML = "D";
						document.getElementById(z+"a").innerHTML = "D";}


				}

//this is the function i'm having trouble with, on the first click one of the values
// shows up as undefined, but on the second click it gets both values ok, i'm guessing
//it's because the functions are running at the same time.
						$scope.logoa = function(x){
								var lh = $scope.y[x]._links.homeTeam.href;
								var la = $scope.y[x]._links.awayTeam.href;
								$scope.getTeam(la);
								document.getElementById("1").innerHTML = $scope.da.code;
								$scope.getTeamh(lh);
								document.getElementById("2").innerHTML = $scope.dat.code;
							}
























						//}

















}]);
