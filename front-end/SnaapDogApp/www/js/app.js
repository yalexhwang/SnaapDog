// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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
  .state('landing', {
    url: '/landing',
    templateUrl: 'templates/landing.html',
    controller: 'LogInCtrl'
  });

  $stateProvider
   .state('tabs', {
      url: "/tabs",
      templateUrl: "templates/tabs.html",
      controller: 'TabsCtrl'
    })

   .state('tabs.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tabs.chats', {
      url: '/tabs/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tabs.chat-detail', {
      url: '/tabs/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tabs.account', {
    url: '/tabs/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tabs.something', {
    url: '/tabs/something',
    views: {
      'tab-something': {
        templateUrl: 'templates/tab-something.html',
        controller: 'SomethingCtrl'
      }
    }
  })

  
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  });

 

    // .state('app.search', {
    //   url: "/search",
    //   views: {
    //     'tabsContent' :{
    //       templateUrl: "search.html",
    //       controller: 'SearchCtrl'
    //     }
    //   }
    // })
    // .state('app.contact', {
    //   url: "/contact",
    //   views: {
    //     'tabsContent' :{
    //       templateUrl: "contact.html",
    //       controller: 'PlaylistsCtrl'
    //     },
    //     'tabsList': {
    //       templateUrl : "tabsBrowse.html",
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })
    // .state('app.browse', {
    //   url: "/browse",
    //   views: {
    //     'tabsContent' :{
    //       templateUrl: "browse.html"
    //     },
    //     'tabsList': {
    //       templateUrl : "tabsBrowse.html"
    //     }
    //   }
    // })
    // .state('app.playlists', {
    //   url: "/playlists",
    //   views: {
    //     'tabsContent' :{
    //       templateUrl: "playlists.html",
    //       controller: 'PlaylistsCtrl'
    //     },
    //     'tabsList': {
    //       templateUrl : "tabsPlaylists.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })

    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'tabsContent' :{
    //       templateUrl: "playlist.html",
    //       controller: 'PlaylistCtrl'
    //     },
    //     'tabsList': {
    //       templateUrl : "tabsPlaylist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

});

