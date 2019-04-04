/**
 * Created by macrocom on 21.10.2014.
 */

define([
	'jquery', 'lodash', 'backbone', 'text!./buttons.tpl'
], function ( $, _, Backbone, tpl )
{
	var LogoHP = Backbone.View.extend(
	{
		className 	: "module-info",
		template 	: _.template( tpl ),

		events: {
                    "click a" : "onClick"
		},

		initialize: function ( opt )
		{
                    this.locale = opt.locale || {};
                   
                    this.registerEvents();
                    this.render();
		},

		registerEvents : function() {
		    this.listenTo( this.model, 'change', this.render );
		},
                
                onClick : function( $ev){ 
                    let $el = $( $ev.currentTarget );
                    alert( "Es wurde ausgewählt: " + $el.data("name") );
                    return false;
                },

		render: function () {
                    this.$el.html( this.template( this.locale ) );
		}
	});
	return LogoHP;
});
