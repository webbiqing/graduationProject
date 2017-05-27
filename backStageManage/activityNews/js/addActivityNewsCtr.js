/**
 * Created by hand on 2017/2/16.
 */
App.controller('addActivityNewsCtr', function($rootScope, $scope,$stateParams,$resource, $filter,ngDialog,$timeout,cmsImageUpload) {

    $scope.articleId = $stateParams.articleId;

    var querryArticle = function (id) {
        var param = {
            id:id
        };
        cmsImageUpload.Query('exhibition/articles/:id',param).then(function (data) {
            if(angular.isUndefined(data.error)){
                $scope.gardenInfo = data.result;
            }else{

            }
        });
    };

    if($scope.articleId){
        querryArticle($scope.articleId);
    }


    $scope.addGardenInfo = function (gardenInfo) {
        var postData= {
            'pavilion_num':'6256826112253366272',
            'title':gardenInfo.title,
            'author':gardenInfo.author,
            "content":gardenInfo.content,
            "category_id":Date.parse( new Date())
        };
        var param = '';
        debugger;
        cmsImageUpload.Add('exhibition/articles',param,postData).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                alert('添加成功！');
            } else {
                alert('添加失败！');
            }
        });
    };
    
    $scope.updateGardenInfo =function (gardenInfo) {
        var postData= {
            'id':$scope.articleId,
            'pavilion_num':'6256826112253366272',
            'title':gardenInfo.title,
            'author':gardenInfo.author,
            "content":gardenInfo.content
        };
        var param = '';

        cmsImageUpload.Update('exhibition/articles',param,postData).then(function (data,header) {
            if(angular.isUndefined(data.error)) {
                alert('修改成功！');
            } else {
                alert('修改失败！');
            }
        });
    };


});
