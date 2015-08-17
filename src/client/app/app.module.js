(function() {
	'use strict';
	
	var app = angular
				.module('app', [
					'ui.router',
					'ngAnimate',
					'app.core',
					'app.reviews'
				])

	app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/app/reviews');

		$stateProvider.
			state('app', {
				url: '/app',
				templateUrl: ('app/app.tpls.html'),
				controller: 'ReviewsCtrl',
				resolve: {
					reviews: ['$http', function($http) {
						return $http.get('reviews.json').then(function(response) {
							return response.data;
						});
					}]
				}
			}).
			state('app.reviews', {
				url: '/reviews',
				templateUrl: ('app/reviews/reviews.tpls.html')
			}).
			state('app.review', {
				url: '/:id/review',
				templateUrl: ('app/reviews/review-detail.tpls.html'),
				controller: 'CoreCtrl'
			})
			// state('one', {
			// 	url: '/one',
			// 	templateUrl: ('app/reviews/review-detail.tpls.html')
			// })
	}])

})();