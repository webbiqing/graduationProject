/**
 * Created by hand on 2017/2/16.
 */
App.controller('companyInfoManageCtr', function($rootScope, $scope, $state,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {

    var querryAll = function () {
        var param = {
            'id':'6256826112253366272'
        };
        cmsImageUpload.Query('exhibition/pavilion/:id',param).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                $scope.companyData = data.result.data;
            } else {

            }
        });
    };
    querryAll();

    $scope.updateCompanyInfo =function (companyData) {
        var formData = {
            id:'6256826112253366272',
            "name":companyData.name,
            "business_model":companyData.business_model,
            "business_scope":companyData.business_scope,
            "company_adress":companyData.company_adress,
            "company_grade":companyData.company_grade,
            "company_introduce":companyData.company_introduce,
            "company_linkMan":companyData.company_linkMan,
            "company_tel":companyData.company_tel,
            "company_url":companyData.company_url
        };
        var param ='';
        cmsImageUpload.Update('exhibition/pavilions',param,formData).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                alert('保存成功！');
            } else {
                alert('保存失败！');
            }
        });
    };

});

