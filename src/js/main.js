/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//import _ from './vendor/lodash/lodash.js'; 
//import THREE from './vendor/three/three';
//import Viewport from './Viewport';

require.config({
    
    "paths": {
        "vendor"    : "vendor",
        "libs"      : "libs",
        "extras"    : "extras",
        "plugins"   : "plugins",
        "utilities" : "extras/utilities",
        "loaders"    : "extras/loaders",
        "locale"    : "locale",
        
        "conf"  : "../conf",
        "data"  : "../data",
        "lang"  : "../lang"
        
    }
});

    require(['app', 'cmd'], function( app, CMD )
    {
        CMD.on("appInitialized", app.start, app);
        
        app.init();
    });
