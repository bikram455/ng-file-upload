app.directive('myImgUpload', function () {
    return {
        templateUrl: '/tpl.html',
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
            scope.remove = function(){
            	delete scope.customModel;
            }
        }
    };
});