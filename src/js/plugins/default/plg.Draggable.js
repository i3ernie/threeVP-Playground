/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["plugin", "Draggable", "cmd"], function( Plugin, Draggable, CMD ){
    var PlgDraggable = function(){
        this.super.constructor.call( this );
    };
    
    PlgDraggable.prototype = Object.create( Plugin.prototype );
    PlgDraggable.prototype.constructor = PlgDraggable;
    Draggable.prototype.super = Plugin.prototype;
    
    PlgDraggable.prototype.registerEvents = function()
    {
        CMD.Scene.on("added", function( el ){
            if ( el.userData && el.userData.draggable === true ) {
                Draggable.makeDraggable( el );
            }
        });
    };
    
    return PlgDraggable;
});
