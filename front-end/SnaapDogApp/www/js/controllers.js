angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log('hello tab dash');
})

.controller('LogInCtrl', function($scope, $http, $stateParams, $state) {
  $scope.login = function(){
    $state.go('tabs.dash', {});
  };

  })

.controller('RegisterCtrl', function($scope, $http, $stateParams, $state) {
  $scope.home = function(){
    $state.go('tabs.dash', {});
  };
  $scope.landing = function(){
    $state.go('landing', {});
  };
  })

.controller('TabsCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
  $scope.openMenuLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  })


.controller('SomethingCtrl', function($scope, $http) {
  console.log("something")
})

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = c;
//   $scope.disable=true;
// })


// .controller('SearchCtrl', function($scope) {
//   $scope.playlists = c;
// })

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

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.home = function(){
    $state.go('tabs.dash', {});
  };
});


// .directive();



