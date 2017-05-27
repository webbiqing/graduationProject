/**
 * Created by hand on 2017/2/16.
 */
App.controller('companyShowDynamicDetailCtr', function($rootScope, $scope, $stateParams,$resource, $filter,ngDialog,cmsImageUpload) {
    $scope.newsId =$stateParams.newsId;
    //运河城市园区宣传列表分页查询
        $scope.querryNews = function () {
            var param = {
                id:$scope.newsId
            };
            cmsImageUpload.Query('exhibition/articles/:id',param).then(function (data) {
                if(angular.isUndefined(data.error)){
                    $scope.gardenInfo = data.result;
                }else{

                }
            });
        };
    $scope.querryNews();
});