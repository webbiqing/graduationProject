var myChart;
var domGraphic = document.getElementById('graphic');
var domMain = document.getElementById('main');
var needRefresh = false;

var startPoint = {
    x: 104.114129,
    y: 37.550339
};
var BMapExtension;

var curTheme;
function requireCallback (ec, defaultTheme) {
    curTheme = {};
    echarts = ec;
    refresh();
}

var editor = CodeMirror.fromTextArea(
    document.getElementById("code"),
    { lineNumbers: true }
);
editor.setOption("theme", 'monokai');


editor.on('change', function(){needRefresh = true;});

function refresh(){
    require(['BMap'], function(mapEx){
        BMapExtension = mapEx;
        // if (isBtnRefresh) {
        //     needRefresh = true;
        //     focusGraphic();
        //     return;
        // }
        needRefresh = false;

        (new Function(editor.doc.getValue()))();
    });
}

    require.config({
        paths: {
            echarts: '../../../doc/example/www/js'
        },
        packages: [
            {
                name: 'BMap',
                location: '../src',
                main: 'main'
            }
        ]
    });
    launchExample();

var isExampleLaunched;
function launchExample() {
    if (isExampleLaunched) {
        return;
    }
    // 按需加载
    isExampleLaunched = 1;
    require(
        [
            'echarts',
            // 'http://echarts.baidu.com/doc/example/theme/' + hash.replace('-en', ''),
            'echarts/chart/map'
            // needMap() ? 'echarts/chart/map' : 'echarts'
        ],
        requireCallback
    );
}



