(function() {
	'use strict';

	angular
		.module('app.reviews')
		.controller('ReviewsCtrl', ReviewsCtrl);

	ReviewsCtrl.$inject = ['$scope', '$rootScope', 'reviews'];

	function ReviewsCtrl($scope, $rootScope, reviews) {
		$scope.reviews = reviews;
	};

})();
