/**
 * 路由管理
 */
App.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/homePage');
    $stateProvider
        .state("login",{
            cache: false,
            url : "/login",
            templateUrl : "logReg/login/pages/login.html",
            controller : "loginCtr",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(["logReg/login/js/loginCtr.js"]);
                }]
            }
        })
        .state('homePage', {
            cache: false,
            url : "/homePage",
            views:{
                '':{
                    templateUrl: 'homePage/homePage.html',
                    controller:'homePageCtr',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/js/homePageCtr.js","homePage/css/homePage.css"]);
                        }]
                    }
                },
                'mainBody@homePage':{
                    templateUrl: 'homePage/mainBody/pages/mainBody.html',
                    controller:'mainBodyCtr',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/mainBody/js/mainBodyCtr.js","homePage/mainBody/css/mainBody.css"]);
                        }]
                    }
                }
            }
        })
        .state('homePage.backStage',{
            cache: false,
            url : "/backStage",
            views:{
                'mainBody@homePage': {
                    templateUrl: 'backStageManage/backStage.html',
                    /*controller: 'bacStageCtr',*/
                    resolve: {
                        deps: ["$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load(["backStageManage/css/bacStage.css"]);
                        }]
                    }
                }
            }
        });
});

