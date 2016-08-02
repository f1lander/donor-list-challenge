app.controller('PrincipalCtrl', function ($scope, $state, uiGmapIsReady, $interval, $timeout, $log, cfpLoadingBar, $mdSidenav, DonorService, $mdToast, $filter) {

  $scope.myDate = new Date();
  $scope.$state = $state;
  $scope.donors = [];
  $scope.donor = {};
  $scope.genders = ['F', 'M'];
  $scope.genderFemale = '/img/woman.png';
  $scope.genderMale = '/img/man.png';
  $scope.copyMarkers = [];

  var setPlace = function (place) {
    localStorage.removeItem('place');
    localStorage.setItem('place', JSON.stringify({ address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }));

  }
  
  $scope.initialize = function () {
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    $scope.autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')), {
        types: ['geocode']
      });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener($scope.autocomplete, 'place_changed', function () {
      var _place = $scope.autocomplete.getPlace();
      //  angular.extend($scope.place,place);
      setPlace(_place);

    });
  }

  $scope.$watch('search', function (searchfilter) {
    if (searchfilter) {

      var donorsFiltered = $filter("filter")($scope.donors, searchfilter);
      if (!donorsFiltered) {
        return;
      }

      if (donorsFiltered.length > 0) {

        $scope.map.markers = [];

        for (var i = 0; i < donorsFiltered.length; i++) {
          var marker = new google.maps.Marker({
            id: Date.now(),
            coords: {
              latitude: donorsFiltered[i].location[0],
              longitude: donorsFiltered[i].location[1]
            }
          });

          $scope.map.markers.push(marker);
          bounds.extend(new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude));
        }

        $scope.map2.setCenter(bounds.getCenter());
        $scope.map2.fitBounds(bounds);

      }
    } else {
      $scope.map.markers = [];

        for (var i = 0; i < $scope.donors.length; i++) {
          var marker = new google.maps.Marker({
            id: Date.now(),
            coords: {
              latitude: $scope.donors[i].location[0],
              longitude: $scope.donors[i].location[1]
            }
          });

          $scope.map.markers.push(marker);
          bounds.extend(new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude));
        }

        $scope.map2.setCenter(bounds.getCenter());
        $scope.map2.fitBounds(bounds);

    }
  });

  $scope.initialize();

  var bounds = new google.maps.LatLngBounds();
  var interval;
  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.toastPosition = angular.extend({}, last);
  $scope.getToastPosition = function () {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function (pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;
    if (current.bottom && last.top) current.top = false;
    if (current.top && last.bottom) current.bottom = false;
    if (current.right && last.left) current.left = false;
    if (current.left && last.right) current.right = false;
    last = angular.extend({}, current);
  }
  $scope.showSimpleToast = function (msg) {
    var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position(pinTo)
        .hideDelay(3000)
    );
  };
  $scope.map = {
    center: { latitude: 15.506377, longitude: -88.042295 },
    zoom: 10,
    markers: [],
    control: {},
    options: {
      styles: [{ "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#f26900" }, { "visibility": "on" }] }]
    }
  };
  cfpLoadingBar.start();

  uiGmapIsReady.promise().then(function (map) {
    navigator.geolocation.getCurrentPosition(function (location) {
      $scope.map2 = map[0].map;
      $scope.map2.setCenter({ lat: location.coords.latitude, lng: location.coords.longitude });
      $scope.getDonors();
    });
  });

  $scope.addDonor = function () {
    var place = JSON.parse(localStorage.getItem('place'));

    if (place) {
      $scope.donor.location = [parseFloat(place.lat), parseFloat(place.lng)];
      $scope.donor.address = place.address;
      DonorService.addDonor($scope.donor).then(function (data) {
        if (data.data) {
          $scope.showSimpleToast('The donor was added');
          $scope.getDonors();
          
        };
      }, function (error) {
        $scope.showSimpleToast('An error ocurred ' + error.data.error.message);
      });
    } else {
      $scope.showSimpleToast('Please Select the address');
    }
  }
  $scope.getDonors = function () {
    $scope.donors = [];
    DonorService.getDonors().then(function (data) {
      if (data) {
        $scope.donors = data.data;
        if (data.data.length) {
          for (var i = 0; i < data.data.length; i++) {
            var marker = new google.maps.Marker({
              id: Date.now(),
              coords: {
                latitude: data.data[i].location[0],
                longitude: data.data[i].location[1]
              },
              cityName: data.data.address
            });

            $scope.map.markers.push(marker);
           
            bounds.extend(new google.maps.LatLng(marker.coords.latitude, marker.coords.longitude));
          }

          $scope.map2.setCenter(bounds.getCenter());
          $scope.map2.fitBounds(bounds);
        }
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

  $scope.$on("$destroy", function () {
    clearInterval(interval);
  });

  $scope.bloodTypes = ['O-', 'O+', 'A+', 'A-', 'B-', 'B+', 'AB-', 'AB+'];
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