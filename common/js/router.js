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
                cache: false,
                '':{
                    templateUrl: 'homePage/homePage.html'
                },
                'topBar@homePage':{
                    cache: false,
                    templateUrl: 'homePage/topBar/pages/topBar.html',
                    controller:'topBarCtrl',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/topBar/js/topBarCtr.js","homePage/topBar/css/topBar.css"]);
                        }]
                    }
                },
                'mainBody@homePage':{
                    cache: false,
                    templateUrl: 'homePage/mainBody/pages/mainBody.html',
                    controller:'mainBodyCtr',
                    resolve:{
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(["homePage/mainBody/js/mainBodyCtr.js","homePage/mainBody/css/mainBody.css"]);
                        }]
                    }
                },
                'footBar@homePage':{
                    cache: false,
                    templateUrl: 'homePage/footBar/pages/footBar.html'
                    //controller:''
                }
            },
        });
        /*.state('',{

        })*/
});

