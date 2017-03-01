/**
 * Created by hand on 2017/2/15.
 */
App.controller('homePageCtr', function($rootScope, $scope,$stateParams) {
     $scope.searchType =$stateParams.searchType;
     $scope.login_type = window.localStorage.login_type;
     $scope.userName = window.localStorage.user_name;
     $scope.showRegLogin = false;

     if($scope.login_type){
          $scope.showRegLogin = true;
     }



});

