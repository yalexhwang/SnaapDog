#SnaapDog 

##SnaapDog enables an open collaboration between seekers, finders, and shelters to get roaming dogs home

![Alt text](img/ScreenShot2.png "Home Page")


### Users will be able to:
* Create an alert for their lost pet and notify others in a set radius - tagged with description key words
* Upload a picture of a roaming dog and insert into the database as a sighting - tagged with key words
* Connect with each other without revealing personal contact information

Visit here: [Portfolio](http://shirletterly.com/)

###Requirements `npm install` once pulled


##Built with:
	- Html
	- CSS
	- Javascript
	- jQuery 
	- Bootstrap

##Sample Code
### this code...

```javascript
.controller('mainCtrl', function($scope, $rootScope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, fromDB, myLocation) {
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
      console.log(rspns);u
    });
  }, function fail(rspns) {
    console.log(rspns);
  });
```


####Early stages of site
![Alt text](img/ScreenShot1.png "Early stages of site")

<!-- add a video of interaction with the site -->

##Future Add-ons
- Links to more current projects.
- Ability for visitors to send messages directly from the site to me.
- An enhanced UX/UI design that encourages more visitors.


###Please visit my personal profile to see more current projects.
- [Shirlette Chambers](https://github.com/Shirlazybrat)