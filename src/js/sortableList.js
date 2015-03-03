angular.module('directivesApp')


.directive('mySortableGroup', function () {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div class="col-lg-12">' + 
					'<div class="col-lg-6">' + 
						'<ul ng-transclude></ul>' +
					'</div>' +
					'<div  id="sort-buttons" class="col-lg-3 btn-group">' +
        				'<button title="Move up" type="button" class="btn btn-success" ng-click="moveUp()" ng-disabled="!selected.index">' +
        					'<span class="glyphicon glyphicon-arrow-up" ></span>' +
        				'</button>' +
        				'<button title="Move down" type="button" class="btn btn-success" ng-click="moveDown()" ng-disabled="!selected.index">' + 
        					'<span class="glyphicon glyphicon-arrow-down" ></span>' + 
        				'</button>' +
        				'<button title="Clear selection" type="button" class="btn btn-default"' + 
        					'ng-click="clearSelection()" ng-disabled="!selected.index">' + 
        					'<span class="glyphicon glyphicon-remove-circle" ></span>' + 
        				'</button>' +
        			'</div>' +
        		'</div>',
		controller: function ($scope){
			var items = [];

			$scope.selected = '';

			this.addItem = function (item){
				items.push(item);
			};

			this.select = function (item){
				$scope.selected = item;	
			};

			$scope.clearSelection = function () {
				$scope.selected = '';
			};

			$scope.moveUp = function (){
				if (angular.isDefined($scope.selected.index) && $scope.selected.index > 1){
					updateListBeforeUpgrade($scope.selected.index-1);	
					$scope.selected.index--;
				}
			};

			$scope.moveDown = function () {
				if (angular.isDefined($scope.selected.index) && $scope.selected.index < items.length){
					updateListBeforeDowngrade($scope.selected.index+1);
					$scope.selected.index++;
				}
			};

			this.getClass = function (item){
				return $scope.selected.index === item.index && 'clicked' || '';
			}

			function updateListBeforeUpgrade(index){
				angular.forEach(items, function (item){
					if (item.index === index){
						item.index++;
					}
				});
			}

			function updateListBeforeDowngrade(index){
				angular.forEach(items, function (item){
					if (item.index === index){
						item.index--;
					}
				});
			}

		}
	}
})
.directive('mySortable', function () {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		require: '^mySortableGroup',
		scope: {
			item: '='
		},
		template: '<li class="sortable" ng-class="getClass(item)" ng-click="select(item)" ng-transclude></li>',
		link: function (scope, element, attr, controller){

			controller.addItem(scope.item);

			scope.select = controller.select;	
			
			scope.getClass = controller.getClass;

		}
	}
});