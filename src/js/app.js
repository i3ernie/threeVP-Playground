/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["module", 
    'lodash', "cmd", "three", "async", "Viewport", 
    "modules/default/Menu/Module", "plugin",
    "plugins/default/plg.i18n", "json!conf/default/locales.json"
], 
function( module, 
_, CMD, THREE, async, Viewport, 
MMenu, Plugin, 
PlgI18n, locales ){
    
    let Data = {
        plugins : [],
        locales : locales,
        CMD : CMD
    };

    let APP = {
        init : function(){
            let scope = this;
            
            Data.plugins.push( new PlgI18n() );
            
            CMD.trigger( "initAPP", this );
            
            this.VP = new Viewport( );
            this.VP.init();
            
            Plugin.initPlugins(Data, function( err, res ){
                if (!err) {
                    scope.locale = Data.locale;
                    CMD.trigger("appInitialized", scope);
                } else {
                    
                }
            });
            
        },
        
        start : function(){
            CMD.trigger("startAPP", this);
            let VP = this.VP;
            let scope = this;
           
            new MMenu({ el:"#mainmenu", locale:this.locale.ui, CMD:CMD, data:{} });
           
            
            let col = "red";

            var myFontLoader = new THREE.FontLoader();
            myFontLoader.load( 'style/fonts/helvetiker_regular.typeface.json', function ( font ) 
            {
                let geo =  new THREE.TextGeometry( scope.locale.colors[col], {
                    font: font,
                    size: 1,
                    height: .5
                } );
                
                let mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial({color:col}) );
                mesh.position.y = .5;
                VP.scene.add( mesh );
                
            });
            
            console.log( this.locale.colors.red );
            
            let floor = new THREE.Mesh( new THREE.BoxGeometry(20, .1, 20), new THREE.MeshBasicMaterial({color:"gray"}) );
            floor.position.y = -.05;
            
            VP.scene.add( floor );
            
            VP.camera.position.z = 10;
            
            VP.start();
            CMD.trigger("appStarted");
        }
    };
    
    return APP;
        
});
