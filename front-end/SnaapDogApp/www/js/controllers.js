angular.module('starter.controllers', ['ngCordova'])

.service('myLocation', function($q, $http, $window, $cordovaGeolocation) {
  this.locate = function() {
    var def = $q.defer();
    var coords = {};
    // var posOptions = {
    //   enableHighAccuracy: true,
    //   timeout: 2000,
    //   maximumAge: 0
    // };
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function success(position) {
      console.log(position);
      def.resolve(position);
    }, function fail(rspns) {
      console.log(rspns);
      def.reject(rspns);
    });
    return def.promise;
  }
})

.service('fromDB', function($http, $q) {
  // var data = {};
  var url = "http://localhost:3000";
  this.strayEntries = function() {
    var def = $q.defer();
    $http.post(url + '/stray_entries')
    .then(function success(rspns) {
      console.log(rspns);
      def.resolve(rspns);

    }, function fail(rspns) {
      def.reject(rspns);
    });
    return def.promise;
  };
})

//Controllers - - - - - - - - - - - - -

.controller('DashCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log('hello tab dash');
})

.controller('LogInCtrl', function($scope, $http, $stateParams, $state, $rootScope) {
  var url = "http://localhost:3000";
  $scope.username = {};
  $scope.password = {};
  $scope.login = function() {
    $http.post(url + '/landing', {
      username: $scope.username.username,
      password: $scope.password.password
    }).then(function success(rspns) {
        $rootScope.user = rspns.data.docs;
        $state.go('tabs.dash');  //where there is main, put dash
        console.log('Tabs dash')
    }, function failure(rspns) {
        console.log("AJAX failed")
        console.log(rspns);
    });
  };
})


.controller('RegisterCtrl', function($scope, $http, $stateParams, $state) {
  $scope.home = function(){
    $state.go('tabs.dash', {});
  };
  $scope.landing = function(){
    $state.go('landing', {});
  };
  var url = "http://localhost:3000";
  $scope.user = {};
  $scope.confirm = {};
  var pw = $scope.confrimPW;
  var temp = {
    fname: 'Alex',
    lname: 'Hwang',
    username: 'ah',
    email: 'ah@test.com',
    password: 111
  };

  $scope.register = function() {
    console.log($scope.test);
    console.log($scope.user);
    console.log($scope.confirm);
    if (temp.password == 111) {
      console.log("Password match");
      $http.post(url + '/register', {
        user: temp
      }).then(function success(rspns) {
        console.log(rspns);
        $location.path('/landing');
      }, function fail(rspns) { 
        console.log("error")
      });
    } else {
      console.log("Try confirmPW again");
    }
  };
})



.controller('SomethingCtrl', function($scope, $http) {
  console.log("something")
})


.controller('TabsCtrl', function($scope, $rootScope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, fromDB, myLocation, $ionicModal, $timeout, $ionicSideMenuDelegate) {
  $scope.openMenuLeft = function() {
    console.log("ANyting?")
    $ionicSideMenuDelegate.toggleLeft();
  };

  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Finding your location'
    });
    // $ionicLoading.hide();
  });
  var markers = [];
  var myLoc = {};
  var map; 

  fromDB.strayEntries().then(function success(rspns) {
    var entries = rspns.data.docs;
    $rootScope.stray_entries = entries;
    $scope.totalEntries = $rootScope.stray_entries.length;
    console.log($rootScope.stray_entries);
  }, function fail(rspns) {
    console.log(rspns);
  })
  .then(function success(rspns) {
    myLocation.locate().then(function success(rspns) {
      var lat = rspns.coords.latitude;
      var lng = rspns.coords.longitude;
      myLoc = new google.maps.LatLng(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), {
        center: myLoc,
        zoom: 8
      });
      $ionicLoading.hide();
    }, function fail(rspns) {
      console.log(rspns);
    })
    .then(function success(rspns) {
      for (var i = 0; i < $rootScope.stray_entries.length; i++) {
        placeMarkers($rootScope.stray_entries[i], map);
      }
    }, function fail(rspns) {
      console.log(rspns);
    });
  }, function fail(rspns) {
    console.log(rspns);
  });
  
  var infoWindow = new google.maps.InfoWindow({});
  function placeMarkers(entry, map) {
    var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•%7CFE7569';
    var content = '<h4>' + entry.dog_name + '</h4><p>' + entry.description + '</p>' + '<a ng-click="streetView()">Here</a>';
    var marker = new google.maps.Marker({
        position: {lat: entry.location.coords.lat, lng: entry.location.coords.lng},
        icon: icon,
        map: map,
        title: entry.dog_name,
        animation: google.maps.Animation.DROP
      });
    marker.addListener('click', function() {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      map.setZoom(11);
      map.setCenter(marker.getPosition());
    });
    markers.push(marker);
  }

})
.controller('snaapCtrl', function($scope, $cordovaCamera, $ionicPlatform) {
  console.log("snaapCtrl");
  $scope.test ="works";
  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
   $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      // An error occured. Show a message to the user
    });
  };
                
  $scope.choosePhoto = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
       $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
      // An error occured. Show a message to the user
    });
  };
                
})

.controller('postCtrl', function($scope, $rootScope, $http, myLocation) {
  var url = "http://localhost:3000";
  console.log('postCtrl');
  $http.post(url + '/post_categories')
  .then(function success(rspns) {
    console.log(rspns);
    var breeds = rspns.data.docs.breeds;
    var sizes = rspns.data.docs.sizes;
    var coats = rspns.data.docs.coats;
    var colors = rspns.data.docs.colors;
    $scope.breedArr = [];
    for (var prop in breeds[0]) {
      var item = [prop, breeds[0][prop]];
      $scope.breedArr.push(item);
    }
    $scope.sizeArr = [];
    for (var prop in sizes[0]) {
      var item = [prop, sizes[0][prop]];
      $scope.sizeArr.push(item);
    }
    $scope.coatArr = [];
    for (var prop in coats[0]) {
      var item = [prop, coats[0][prop]];
      $scope.coatArr.push(item);
    }
    $scope.colorArr = [];
    for (var prop in colors[0]) {
      var item = [prop, colors[0][prop]];
      $scope.colorArr.push(item);
    }
  }, function fail(rspns) {
    console.log(rspns);
  });

  myLocation.locate().then(function success(rspns) {
    var lat = rspns.coords.latitude;
    var lng = rspns.coords.longitude;
    myLoc = new google.maps.LatLng(lat, lng);
    console.log(myLoc);
    var map = new google.maps.Map(document.getElementById('map-sm'), {
      center: myLoc,
      zoom: 13
    });
    google.maps.event.addListener(map, 'click', function(event) {
      console.log(event.latLng);
      var marker = new google.maps.Marker({
        position: event.latLng
      });
      console.log(marker.getPosition());
      dropAPin(marker, map);
    });

    var markerArr = [];
    function dropAPin(marker, map) {
      for (var i = 0; i < markerArr.length; i++) {
        markerArr[i].setMap(null);
      }
      markerArr = [];
      markerArr.push(marker);
      for (var i = 0; i < markerArr.length; i++) {
        markerArr[i].setMap(map);
        map.panTo(location);
      }
    }
  }, function fail(rspns) {

  });
  $scope.post = {};
  $scope.owner = $rootScope.user.username;
  $scope.submit = function() {
    console.log($scope.post);
    if (($scope.post.owner == undefined) || ($scope.post.owner == "")) {
      $scope.post.owner = $scope.owner;
    }
    var user = {
      id: $rootScope.user._id,
      username: $rootScope.user.username
    };
    console.log(user);
   $http.post(url + '/post', {
      user: user,
      post: $scope.post
    }).then(function succeess(rspns) {
      console.log(rspns);

    }, function fail(rspns) {

    });
  };
})

.controller('listingCtrl', function($scope, $http) {
  console.log("listingCtrl");
  var url = "http://localhost:3000";
  $http.post(url + '/listing')
  .then(function succeess(rspns) {
    console.log(rspns.data);
    $scope.starys = rspns.docs;
  }, function fail(rspns) {
    console.log(rspns);
  });
  console.log("listings");
  //MODAL
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope, animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.openModal = function(stray) {
    $scope.stray = stray;
    $scope.modal.show();
    };
    $scope.closeModal = function() {
  
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
//MODAL END

}) //end listing ctrl



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.home = function(){
    $state.go('tabs.dash', {});
  };
});




