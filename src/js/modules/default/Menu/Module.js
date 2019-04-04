/**
 * Created by Hessberger on 02.12.2014.
 */
define(["./Model","./View"], function ( Model, View ) {
	var Module = function ( opt )
	{
            let model = opt.model || new Model( opt.data );
            if ( opt.CMD ) model.CMD = opt.CMD;

            var VMenu = new View({
                    el : opt.el,
                    model : model,
                    locale : opt.locale
            });
            return VMenu;
	};
	return Module;
});