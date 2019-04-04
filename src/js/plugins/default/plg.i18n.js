/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["plugin", "cmd", "url", "loaders/Loader.Languages"], function( Plugin, CMD, URL, LanguageLoader )
{
    var Plgi18n = function( opt )
    {    
        let l = URL.lang || "de";

        require.config({
            "config": {
                "i18n": {
                    "locale": l
                }
            }
        });
        
        Plugin.call( this, opt );
        
        this.loader = new LanguageLoader();
    };
    
    Plgi18n.prototype = Object.create( Plugin.prototype );
    Plgi18n.prototype.constructor = Plgi18n;
    
    Plgi18n.prototype.registerEvents = function()
    {
        
    };
    
    Plgi18n.prototype.initPlugin = function( app, done )
    {    
        this.loader.loadLocales( app.locales, function( err, res ) {
            if ( !err ) app.locale = res;
            done( null, app);

        });
    };
    
    return Plgi18n;
});

