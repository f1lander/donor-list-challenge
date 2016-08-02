var app = angular.module('donor', ['ui.router',

    'ngAnimate',
    'uiGmapgoogle-maps',
    'angular-loading-bar',
    'ngMaterial',
    'ngMdIcons']);

app.config(function ($mdThemingProvider) {
    var customPrimary = {
        '50': '#fbb4af',
        '100': '#f99d97',
        '200': '#f8877f',
        '300': '#f77066',
        '400': '#f55a4e',
        '500': '#F44336',
        '600': '#f32c1e',
        '700': '#ea1c0d',
        '800': '#d2190b',
        '900': '#ba160a',
        'A100': '#fccbc7',
        'A200': '#fde1df',
        'A400': '#fff8f7',
        'A700': '#a21309'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#6d5200',
        '100': '#866500',
        '200': '#a07800',
        '300': '#b98b00',
        '400': '#d39e00',
        '500': '#ecb100',
        '600': '#ffc720',
        '700': '#ffce3a',
        '800': '#ffd453',
        '900': '#ffda6d',
        'A100': '#ffc720',
        'A200': '#FFC107',
        'A400': '#ecb100',
        'A700': '#ffe186'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#ffb8a1',
        '100': '#ffa588',
        '200': '#ff916e',
        '300': '#ff7e55',
        '400': '#ff6a3b',
        '500': '#FF5722',
        '600': '#ff4408',
        '700': '#ee3900',
        '800': '#d43300',
        '900': '#bb2d00',
        'A100': '#ffcbbb',
        'A200': '#ffdfd4',
        'A400': '#fff2ee',
        'A700': '#a12700'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);
   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       
});
app.config(function ($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.when('/dashboard', '/dashboard/principal');
   $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
     
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
             controller:"PrincipalCtrl"
        }).state('principal', {
          url: '/principal',
          parent: 'dashboard',
          templateUrl: 'views/principal.html',
          controller:"PrincipalCtrl"
          
        })


});




app.controller('AppCtrl', function ($rootScope, $scope, $timeout, $mdSidenav, $log, $state) {
  //$scope.language = localStorage.getItem('language');


});