angular.module('myapp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view/home_page.html',
        controller: home_page
    }).when('/contact_page', {
        templateUrl: 'view/contact_page.html',
        controller: contact_page
    }).when('/order_page', {
        templateUrl: 'view/order_page.html',
        controller: order_page
    })
})