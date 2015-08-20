var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    
    png_box:"res/object/myBox.png",
    png_box2:"res/object/box.png",
    
    tmx_map1:"res/map/map1.tmx",
    png_map1:"res/map/TileA3.png",
    
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}