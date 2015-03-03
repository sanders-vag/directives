var app = angular.module('directivesApp', []);

app.controller('appCtrl', function($scope){
	
	$scope.itemList = [{
		firstName: "Jane",
		lastName: "Martin",
		index: 1
	},{
		firstName: "James",
		lastName: "Moore",
		index: 2
	},{
		firstName: "Salma",
		lastName: "Jefferson", 
		index: 3
	},{
		firstName: "Claud",
		lastName: "Simons", 
		index: 4
	},{
		firstName: "Bob",
		lastName: "Hurley", 
		index: 5
	},{
		firstName: "Sean",
		lastName: "Green", 
		index: 6
	}];


	$scope.selectItem = function (item){
		$scope.selected = item;
		console.log("Selected item with index " + $scope.selected.index);
	}

	$scope.upgradeItem = function (){
		if (angular.isDefined($scope.selected) && $scope.selected.index > 1){
			updateListBeforeUpgrade($scope.selected.index-1);
			$scope.selected.index--;
			console.log("Upgraded successfully to " + $scope.selected.index);
		}

	};


	$scope.downgradeItem = function (){
		if (angular.isDefined($scope.selected) && $scope.selected.index < $scope.itemList.length){
				updateListBeforeDowngrade($scope.selected.index+1);
			$scope.selected.index++;
			console.log("Downgraded successfully to " + $scope.selected.index);
		}

	};

	function updateListBeforeUpgrade(index){
		angular.forEach($scope.itemList, function (item){
			if (item.index === index){
				item.index++;
			}

		});
	}

	function updateListBeforeDowngrade(index){
		angular.forEach($scope.itemList, function (item){
			if (item.index === index){
				item.index--;
			}

		});
	}

});
