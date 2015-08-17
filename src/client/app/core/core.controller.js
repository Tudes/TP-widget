(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('CoreCtrl', CoreCtrl);

	CoreCtrl.$inject = ['$scope', '$stateParams', 'reviews'];

	function CoreCtrl($scope, $stateParams, reviews) {
		$scope.review = $scope.reviews[$stateParams.id];
		$scope.prevPage = function() {
			// console.log('Previous page');
			if($scope.review.id > 0) {
				$scope.review.id--;
			}
		}
		$scope.nextPage = function() {
			// console.log('Next page');
			if ($scope.review.id < 9) {
				$scope.review.id++;
			}
		}
	};

})();
					