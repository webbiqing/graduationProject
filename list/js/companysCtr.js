/**
 * Created by hand on 2017/2/17.
 */
App.controller('companysCtr', function($rootScope, $scope, $state,$stateParams,$resource, $filter,ngDialog,cmsImageUpload) {
    $scope.searchType = $stateParams.searchType;
    var querryAll = function (title,type) {
        var param = {
            'pavilionNum':'6256826112253366272',
            'productName':title,
            'productType':type
        };
        cmsImageUpload.Query('exhibition/products',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.carouselData = data.result.data;
            } else {

            }
        });
    };
    querryAll();
    $scope.searchPro =function (type) {
            var param = {
                'pavilionNum':'6256826112253366272',
                'productType':type
            };
            cmsImageUpload.Query('exhibition/products',param).then(function (data,header) {
                if(angular.isUndefined(data.error)) {
                    $scope.carouselData = data.result.data;
                } else {

                }
            });
    }
});

