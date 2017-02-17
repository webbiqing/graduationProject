/**
 * Created by hand on 2017/2/17.
 */
App.controller('companysCtr', function($rootScope, $scope, $state,$stateParams,$resource, $filter,ngDialog,$timeout) {
    $scope.searchType = $stateParams.searchType;
    console.log($scope.searchType);
});

