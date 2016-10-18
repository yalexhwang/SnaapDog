angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope) {})

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

// .controller('foundCtrl',function($scope,$http){
//     var url = "http://localhost:3000";
//     $scope.found={};
//     console.log($scope.found);
//      $scope.foundPost=function($scope.found)
//     $http.post(url+'/posting',{
//       found:$scope.found
//     }).then(function success(rspns){
//       console.log(rspns);
//     } function success(rspns){
//       console.log(rspns);
//     });
//   };
// })







