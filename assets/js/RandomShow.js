//开始
jQuery(document).ready(function ($) {
    showMe(Random())
    function Random(){return new Date().getSeconds()%2}
    function showMe(r){
        var r;
        if (r==1){
            L2Dwidget.init({        
            "pluginRootPath": "live2dw_shizuku/",
            "pluginJsPath": "lib/",
            "pluginModelPath": "assets/",
            "tagMode": false,
            "debug": false,
            "model": {"jsonPath": "/assets/live2dw/live2dw_shizuku/assets/shizuku.model.json"},
            "display": {"position": "right", "width": 90, "height": 100, "hOffset": 100, "vOffset": 0,},
            "mobile": {"show": true,scale: 0.5,},
            "log": false});
        }
        if (r==0) {
            var obj=document.getElementById("abc")
            obj.style.display=""
        }
    }
});