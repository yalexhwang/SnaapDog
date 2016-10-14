angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvidergit c
    .state('home', {
    url: '/',
    abstract: true,
    templateUrl: '<ui-view>'
  })
  .state('home.snapp', {
    url: '/snaap',
    views: {
      'snapp': {
        templateUrl: 'templates/snaap.html',
        controller: 'snaapCtrl'
      }
    }
  })

  .state('home.mark', {
      url: '/mark',
      views: {
        'mark': {
          templateUrl: 'templates/mark.html',
          controller: 'markCtrl'
        }
      }
    })
    .state('home.post', {
      url: '/post',
      views: {
        post: {
          templateUrl: 'template/post.html',
          controller: 'postCtrl'
        }
      }
    })

  .state('home.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
