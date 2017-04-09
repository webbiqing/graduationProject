/**
 * Created by hand on 2017/2/16.
 */
App.controller('addProductCtr', function($rootScope, $scope, $state,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {
    //新增轮播图片
    $scope.addProductInfo = function () {
        var files1 =document.getElementsByName("file_upload1");
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            if(angular.isUndefined(data.data.error)){
                console.log('图片上传成功');
            }else {
                console.log('图片上传失败');
            }
        });
    };
});

