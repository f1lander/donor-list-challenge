var app = angular.module('donor', ['ui.router',
    'ngAnimate',
    'angular-loading-bar',

    'ngMaterial',
    'ngMdIcons']);

app.config(function ($stateProvider, $urlRouterProvider) {

   // $urlRouterProvider.when('/dashboard', '/dashboard/');
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
     
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'AppCtrl'
        })


});

app.controller('AppCtrl', function ($rootScope, $scope, $timeout, $mdSidenav, $log, $state) {
  //$scope.language = localStorage.getItem('language');

  $scope.bloodTypes = ['O-','O+','A+','A-','B-','B+','AB-','AB+'];
  $scope.openMenu = function ($mdOpenMenu, ev) {
    //originatorEv = ev;
    $mdOpenMenu(ev);
  };

  

  $scope.goTo = function (item) {
    $state.go(item.link);
    $scope.currentPage = item.title;

  };

  $scope.signOut = function () {
    localStorage.removeItem('token');
    $state.go('login');
  }

//   $scope.toggleLanguage = function () {
//     $scope.language = $scope.language == 'en' ? 'es' : 'en';
//     localStorage.setItem('language', $scope.language);
//     $translate.use($scope.language);
//   };

  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function () {
    return $mdSidenav('right').isOpen();
  };
  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function () {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function () {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  function buildToggler(navID) {
    return function () {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
});