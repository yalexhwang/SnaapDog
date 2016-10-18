angular.module('starter.controllers', [])




.controller("PictureCtrl", function($scope, $cordovaCamera) {
    document.addEventListener("deviceready", function () {
         $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    })
})

.controller('ListingsCtrl', function($scope, $ionicModal) {
  $scope.message = "works";
    $scope.strays = [
  {
    photo: "img/stray1.jpeg",
    size: 'large',
    color: 'brown/black'
  },
   {
    photo: "img/stray2.jpeg",
    size: 'large',
    color: 'brown/white'
  },
   {
    photo: "img/stray3.jpeg",
    size: 'large',
    color: 'tan'
  },
   {
    photo: "img/stray4.jpeg",
    size: 'small',
    color: 'brown/black'
  },
   {
    photo: "img/stray5.jpeg",
    size: 'large',
    color: 'grey'
  },
   {
    photo: "img/stray6.jpeg",
    size: 'large',
    color: 'white/black'
  }
  ] //end strays object

  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500
  }
 //MODAL
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope, animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.openModal = function() {
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


}) //end listing ctrl

.controller('DashCtrl', function($scope) {


}) // end dashctrl

.controller('LogInCtrl', function($scope, $http, $stateParams) {

  })

.controller('RegisterCtrl', function($scope, $http, $stateParams) {

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});









