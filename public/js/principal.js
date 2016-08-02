app.controller('PrincipalCtrl', function ($scope, $state, uiGmapIsReady, $interval, cfpLoadingBar, $mdSidenav) {

  $scope.myDate = new Date();
  $scope.$state = $state;
  $scope.checkIns = [];
$scope.filterService = filterService;
  var bounds = new google.maps.LatLngBounds();
  var interval;
  $scope.map = {
    center: { latitude: 15.506377, longitude: -88.042295 },
    zoom: 10,
    markers: [],
    control: {},
    options: {
      styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]
    }
  };
  var map2;

  uiGmapIsReady.promise().then(function (map) {
    $scope.map2 = map[0].map;
    $scope.getCheckIns();
  });

  $scope.getCheckIns = function () {
    $scope.checkIns = [];
    CheckInService.getChekIns().then(function (data) {
      if (data) {
        $scope.checkIns = data.data;
        for (var i = 0; i < data.data.length; i++) {
          var marker = new google.maps.Marker({
            id: Date.now(),
            coords: {
              latitude: data.data[i].customer.location[0],
              longitude: data.data[i].customer.location[1]
            },
            icon:'http://maps.google.com/mapfiles/ms/icons/blue.png'
          });
         
          $scope.map.markers.push(marker);
          bounds.extend(new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude));
        }

        $scope.map2.setCenter(bounds.getCenter());
        $scope.map2.fitBounds(bounds);
        // if (!angular.isDefined(interval)) {
        //   interval = setInterval(function () { $scope.getCheckIns() }, 10000);
        // }
        //$scope.$apply();
      } else {
        cfpLoadingBar.complete();
      }
    }, function (error) {

    })
  };

  $scope.logOut = function () {
    localStorage.setItem('token', null);
    $state.go('login');
  };

  $scope.close = function () {
    $mdSidenav('left').close();
  };
  
  $scope.$on("$destroy", function(){
        clearInterval(interval);
    });
    
});