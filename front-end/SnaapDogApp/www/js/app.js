// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.router','ngCordova'])
//put in 'ngCordova'

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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider




// setup an abstract state for the tabs directive
  $stateProvider
   .state('tabs', {
      url: "/tabs",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'TabsCtrl'
    })

   .state('tabs.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'TabsCtrl'
      }
    }
  })


  .state('tabs.chats', {
      url: '/tabs/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'TabsCtrl'
        }
      }
    })
  .state('tabs.chat-detail', {
      url: '/tabs/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'TabsCtrl'
        }
      }
    })

  .state('tabs.account', {
    url: '/tabs/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'TabsCtrl'
      }
    }
  })
  .state('tab.listing', {
    url: '/listing',
    views: {
      'tab-listing': {
        templateUrl: 'templates/tab-listing.html',
        controller: 'listingCtrl'
      }
    }
  })

  .state('tab.snaap', {
    url: '/snaap',
    views: {
      'tab-main': {
        templateUrl: 'templates/tab-snaap.html',
        controller: 'snaapCtrl'
      }
    }
  })

  .state('tab.post', {
    url: '/post',
    views: {
      'tab-post': {
        templateUrl: 'templates/tab-post.html',
        controller: 'postCtrl'
      }
    }
  })
  .state('landing', {
    url: '/landing',
    templateUrl: 'templates/landing.html',
    controller: 'LogInCtrl'
  })

  .state('camera', {
    url: '/camera',
    templateUrl: 'templates/camera.html',
    controller: 'snaapCtrl'
  })

  .state('something', {
    url: '/something',
    templateUrl: 'templates/tab-something.html',
    controller: 'RegisterCtrl'
  })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/tab-account.html',
    controller: 'AccountCtrl'
  })


  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

});

