/**
 * Created by hand on 2017/2/16.
 */
App.controller('addProductCtr', function($rootScope, $scope, $stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {

    $scope.productId = $stateParams.carouseId;
    $scope.pavilionNum = $stateParams.pavilion_num;

    var querryCarouseInfo = function (id) {
        var param = {
            'id':'6256826112253366272'
        };
        cmsImageUpload.Query('exhibition/product/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.industryInfo = data.result.data;
            } else {

            }
        });
    };


    if($scope.carouselId){
        querryCarouseInfo($scope.carouselId);
    }

    $scope.updateCarouseInfo =function (industryInfo) {
        var formData = {
            "company_id":'6256826112253366272',
            "product_name":industryInfo.product_name,
            "product_img":industryInfo.product_img,
            "product_info":industryInfo.product_info,
            "product_type":industryInfo.product_type
        };

        var param = {
            id:$scope.carouselId
        };

        var files1 =document.getElementsByName("file_upload1");
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            if(angular.isUndefined(data.error)){
                formData.img_url=data.data.result;
                cmsImageUpload.Update('exhibition/product/:id',param,formData).then(function (data,header) {
                    if(angular.isUndefined(data.error)) {
                        alert('修改成功！');
                    } else {
                        alert('修改失败！');
                    }
                });
            }else {
                alert('图片上传失败！');
            }
        });
    };

    $scope.addCarousel = function (industryInfo) {
        var postData= {
            "company_id":'6256826112253366272',
            "product_name":industryInfo.product_name,
            "product_img":industryInfo.product_img,
            "product_info":industryInfo.product_info,
            "product_type":industryInfo.product_type
        };
        var param = '';

        var files1 =document.getElementsByName("file_upload1");
        cmsImageUpload.image_upload(files1[0].files[0]).then(function(data){
            if(angular.isUndefined(data.error)){
                postData.img_url=data.data.result;
                cmsImageUpload.Add('exhibition/product',param,postData).then(function (data,header) {
                    debugger;
                    if(angular.isUndefined(data.error)) {
                        alert('添加成功！');
                    } else {
                        alert('添加失败！');
                    }
                });
            }else {
                alert('图片上传失败！');
            }
        });


    };
});

