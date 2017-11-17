//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.directive('myImgUpload', function() {
  return {
    templateUrl: 'tpl.html',
    require: ['^form'],
    restrict: 'E',
    replace: true,
    scope: {
      customModel: '=ngModel',
      fieldName: '&name'
    },
    link: function(scope, elem, attr, controllers) {
      scope.form = controllers[0];
      scope.onFileSelected = function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
        console.log('onFileSelected');
      }
      scope.remove = function() {
        delete scope.customModel;
      }
    }
  };
});

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {
        file: file,
        username: $scope.username
      },
    });

    file.upload.then(function(response) {
      $timeout(function() {
        file.result = response.data;
      });
    }, function(response) {
      if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    }, function(evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
}]);
