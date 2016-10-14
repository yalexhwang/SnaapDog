angular.module('starter.controllers', [])
	

.controller('DashCtrl', function($scope, $http) {
	var url = "http://localhost:3000";
	$scope.user = {};
	$scope.register = function() {
	console.log($scope.user);

		$http.post(url + '/register', {
			user: $scope.user
		}).then(function success(rspns) {
			console.log(rspns);
		}, function fail(rspns) {
			console.log("error");
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});		});
	};

})

.controller('snaapCtrl', function($scope, $cordovaCamera) {
	document.addEventListner("deviceReady", function() {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Cemra.PictureSourceType.CAMERA, 
			allowedEdit: true,
			encodingType: Camera.EncodingType.jpeg,
			targetWidth: 150,
			targetHeight: 150,
			popoverOptions: CemeraPopoeverOptions,
			saveToPhotoAlbum: false, 
				correctOrientatin: true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imageData;
		}, function(err) {
			console.log(err);
		});
	}, false);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
