/**
 * Created by bernie on 01.11.15.
 */
define(["plugin", "three", "cmd", "utilities/IntersectPlane"], function( Plugin, THREE, CMD, IntersectPlane )
{
    var selected_block; 
    var intersect_plane;
    var mouse_position= new THREE.Vector3(0, 0, 0), 
        block_offset = new THREE.Vector3(0, 0, 0),
        track = new THREE.Vector3(0, 0, 0);

    var Tracking = function( opt )
    {
        Plugin.call( this, opt );
    };
    
    Tracking.prototype = Object.create( Plugin.prototype );
    Tracking.prototype.constructor = Tracking;
    //Tracking.prototype.super = Plugin.prototype;
    
    Tracking.prototype.registerEvents = function()
    {
        CMD.on( "viewportInitalized", function( VP )
        {    
            intersect_plane = new IntersectPlane( VP );
            VP.scene.add( intersect_plane );    
            
            intersect_plane.addEventListener( "tracking", this.onTrack );
            VP.DomEvents.addEventListener( VP.scene, "mouseup", this.stopTracking );
        }, this );

        CMD.on( "startTracking", this.startTracking, this );
        CMD.on( "stopTracking", this.stopTracking, this );
    };
    
    Tracking.prototype.removeEvents = function(){
        CMD.off( "startTracking", this.startTracking );
        CMD.off( "stopTracking", this.stopTracking);
    };
    
    Tracking.prototype.startTracking = function( ev )
    {
        CMD.VP.trigger( "disableControl" );

        ev.stopPropagation();
        
        selected_block = ev.target;

        mouse_position.copy( ev.intersect.point );
        block_offset.subVectors( selected_block.position, mouse_position );
        block_offset.y = selected_block.position.y;

        intersect_plane.startTracking( mouse_position );
    };
    
    Tracking.prototype.stopTracking = function()
    {
        CMD.VP.trigger( "enableControl" );
        intersect_plane.stopTracking();

        if ( selected_block !== null ) {
            selected_block = null;
            intersect_plane.position.y = 0;
        }
    };

    Tracking.prototype.onTrack = function( evt )
    {
        var ev = evt.origDomEvent;
        ev.stopPropagation();
       
        if ( selected_block !== null && intersect_plane === evt.target) {

            mouse_position.copy( ev.intersect.point );
            
            //set position
            selected_block.track( track.addVectors( mouse_position, block_offset) );
        }
    };

    return Tracking;
});
