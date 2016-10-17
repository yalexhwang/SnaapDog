angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log('hello tab dash');
  $scope.openMenuLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('LogInCtrl', function($scope, $http, $stateParams, $state) {
  $scope.login = function(){
    $state.go('tabs.dash', {});
  };

  })

.controller('RegisterCtrl', function($scope, $http, $stateParams) {

  })

.controller('TabsCtrl', function($scope, $ionicModal, $timeout) {
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

// .directive();



