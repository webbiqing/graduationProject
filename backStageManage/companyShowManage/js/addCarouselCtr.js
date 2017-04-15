/**
 * Created by hand on 2017/2/16.
 */
App.controller('addCarouselCtr', function($rootScope, $scope, $stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {
    $scope.carouselId = $stateParams.carouseId;
    $scope.pavilionNum = $stateParams.pavilion_num;

    var querryCarouseInfo = function (id) {
        var param = {
            'id':id
        };
        cmsImageUpload.Query('exhibition/pavilion/img/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.countryCarouseInfo = data.result.data;
            } else {

            }
        });
    };

    if($scope.carouselId){
        querryCarouseInfo($scope.carouselId);
    }

    //更新
    $scope.updateCarouseInfo =function (countryCarouseInfo) {
    var formData = {
        'pavilion_num':'6256826112253366272',
        'title':countryCarouseInfo.title,
        'link':countryCarouseInfo.link,
        "detail":countryCarouseInfo.detail
    };

    var param = {
        id:$scope.carouselId
    };
    var files1 =document.getElementsByName("file_upload1");
    cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
        if(angular.isUndefined(data.error)){
            formData.img_url=data.data.result;
                cmsImageUpload.Update('exhibition/pavilion/img/:id',param,formData).then(function (data,header) {
                    if(angular.isUndefined(data.error)) {
                        alert('修改成功！');
                    } else {
                        alert('修改失败！');
                    }
                });
        }else{
                alert('图片上传失败！');
            }
        });
    };

    //添加
    $scope.addCarousel = function (countryCarouseInfo) {
        var postData= {
            'pavilion_num':'6256826112253366272',
            'type':1,
            'title':countryCarouseInfo.title,
            'link':countryCarouseInfo.link,
            "detail":countryCarouseInfo.detail
        };
        var param = '';

        var files1 =document.getElementsByName("file_upload1");
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            if(angular.isUndefined(data.error)){
                postData.img_url=data.data.result;
                cmsImageUpload.Add('exhibition/pavilion/img',param,postData).then(function (data,header) {
                    if(angular.isUndefined(data.error)) {
                        alert('轮播图添加成功！');
                    } else {
                        alert('轮播图添加失败！');
                    }
                });
            }else {
                alert('图片上传失败！');
            }
        });


    };
});
