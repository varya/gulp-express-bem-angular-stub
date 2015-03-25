var myApp = angular.module("myApp", [
    "ngRoute"
    ]);

(function(app) {

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/pages/:pageId', {
                templateUrl: borschik.link("main.html"),
                controller: "MainCtrl"
            })
            .when('/', {
                redirectTo: '/pages/main'
            })

        $locationProvider.html5Mode(true);

    });

})(myApp);
