/**
 * Created by macrocom on 27.11.2018.
 */
define([
	'lodash', 'backbone'
], function(
	_, Backbone
){
	var MenuModel = Backbone.Model.extend({

		defaults : {
			description : "abc"
		},

		initialize : function( attr ){
                    this.registerEvents();
                    this.CMD = _.extend( {}, Backbone.Event );
		},

		registerEvents : function(){
                    
                }
	});
	return MenuModel;
});
